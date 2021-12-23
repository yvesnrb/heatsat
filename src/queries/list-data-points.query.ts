import { sub } from 'date-fns';

import { IDataPoint } from '@/entities/data-point.entity';
import { TSatellite } from '@/entities/heat-reading.entity';
import { mongoClientPromise } from '@/util/mongodb';
import { AppError } from '@/util/app-error';

export interface IExecuteRequest {
  timeframe: 1 | 6 | 12;
  satellite?: TSatellite;
}

export class ListDataPointsQuery {
  public async execute(request: IExecuteRequest): Promise<IDataPoint[]> {
    const { timeframe } = request;
    const mongoClient = await mongoClientPromise;

    const timestampLimit = sub(Date.now(), { hours: timeframe });

    const list = await mongoClient
      .db()
      .collection<IDataPoint>('dataPoints')
      .find({
        timestamp: { $gte: timestampLimit },
      })
      .sort({
        timestamp: -1,
      })
      .toArray()
      .catch((_e) => {
        throw new AppError(
          500,
          'ListDataPointsQuery: could not perform query.'
        );
      });

    return list;
  }
}
