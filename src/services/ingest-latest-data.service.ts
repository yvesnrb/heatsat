import { ObjectID } from 'bson';

import { IDataPoint } from '@/entities/data-point.entity';
import { GeodecoderProvider } from '@/providers/geodecoder.provider';
import { InpeProvider } from '@/providers/inpe.provider';
import { FindIngestedDataQuery } from '@/queries/find-ingested-data.query';
import { CreateIngestedDataCommand } from '@/commands/create-ingested-data.command';
import { FindZoneQuery } from '@/queries/find-zone.query';
import { CreateDataPoints } from '@/commands/create-data-points.command';
import { AppError } from '@/util/app-error';

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
   *
   * @throws {AppError(400, 'IngestLatestDataService: newest available data set has already been ingested.')}
   * Thrown if the newest available data has already been ingested.
   */
  public async execute(): Promise<void> {
    const { fileName, date } = await this.inpeProvider.fetchLatestDataInfo();
    const dataPoints: IDataPoint[] = [];

    const ingestedData = await this.findIngestedDataQuery.execute(date);

    if (ingestedData)
      throw new AppError(
        400,
        'IngestLatestDataService: newest available data set has already been ingested.'
      );

    const rawData = await this.inpeProvider.fetchData(fileName);

    for (let r of rawData) {
      const regionId = await this.geodecoderProvider.decode({
        lat: r.lat,
        lon: r.lon,
      });

      if (!regionId) continue;

      dataPoints.push({
        _id: new ObjectID(),
        lat: r.lat,
        lon: r.lon,
        regionId,
        satellite: r.satellite,
        timestamp: r.timestamp,
      });
    }

    await this.createDataPoints.execute(dataPoints);
    await this.createIngestedDataCommand.execute({ timestamp: date });
  }
}
