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

    for (let heatReading of rawData) {
      const location = await this.geodecoderProvider.decode({
        lat: heatReading.lat,
        lon: heatReading.lon,
      });

      if (!location.region || !location.country) continue;

      const zone = await this.findZoneQuery.execute({
        region: location.region,
        country: location.country,
      });

      if (zone)
        dataPoints.push({
          _id: new ObjectID(),
          lat: heatReading.lat,
          lon: heatReading.lon,
          zoneID: zone._id,
          satellite: heatReading.satellite,
          timestamp: heatReading.timestamp,
        });
    }

    await this.createDataPoints.execute(dataPoints);

    await this.createIngestedDataCommand.execute({ timestamp: date });
  }
}
