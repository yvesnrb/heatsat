import { ObjectID } from 'bson';

import { IDataPoint } from '@/entities/data-point.entity';
import { GeodecoderProvider } from '@/providers/geodecoder.provider';
import { InpeProvider } from '@/providers/inpe.provider';
import { FindIngestedDataQuery } from '@/queries/find-ingested-data.query';
import { CreateIngestedDataCommand } from '@/commands/create-ingested-data.command';
import { FindZoneQuery } from '@/queries/find-zone.query';
import { CreateDataPoints } from '@/commands/create-data-points.command';

/**
 * Attempts to find the latest available INPE data, turn it into data points
 * and persist it to MongoDB.
 */
export class IngestLatestDataService {
  constructor(
    private inpeProvider: InpeProvider,
    private geodecoderProvider: GeodecoderProvider,
    private findIngestedDataQuery: FindIngestedDataQuery,
    private findZoneQuery: FindZoneQuery,
    private createIngestedDataCommand: CreateIngestedDataCommand,
    private createDataPoints: CreateDataPoints
  ) {}

  /**
   * Executes the service.
   */
  public async execute(): Promise<void> {
    const { fileName, date } = await this.inpeProvider.fetchLatestDataInfo();
    const dataPoints: IDataPoint[] = [];

    const ingestedData = await this.findIngestedDataQuery.execute(date);

    if (ingestedData)
      throw new Error(
        'IngestLatestDataService: newest available data set has already been ingested.'
      );

    const rawData = await this.inpeProvider.fetchData(fileName);

    await Promise.all(
      rawData.map(async (r) => {
        // Ignore readings outside of South America.
        if (r.lat > 12 || r.lon > -20) return;

        const location = await this.geodecoderProvider.decode({
          lat: r.lat,
          lon: r.lon,
        });

        if (!location?.region || !location?.country) return;

        const zone = await this.findZoneQuery.execute({
          region: location.region,
          country: location.country,
        });

        if (zone)
          dataPoints.push({
            _id: new ObjectID(),
            lat: r.lat,
            lon: r.lon,
            zoneID: zone._id,
            satellite: r.satellite,
            timestamp: r.timestamp,
          });
      })
    );

    await this.createDataPoints.execute(dataPoints);
    await this.createIngestedDataCommand.execute({ timestamp: date });
  }
}
