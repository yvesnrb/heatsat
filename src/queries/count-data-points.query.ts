import { mongoClientPromise } from '@/util/mongodb';
import { endOfMonth, startOfMonth } from 'date-fns';
import { ObjectId } from 'bson';

import { IDataPoint } from '@/entities/data-point.entity';
import { AppError } from '@/util/app-error';

export interface IExecuteRequest {
  date: Date;
  regionId: ObjectId;
}

export class CountDataPointsQuery {
  public async execute(request: IExecuteRequest): Promise<number> {
    const { date, regionId } = request;
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);

    const mongoClient = await mongoClientPromise;

    const count = await mongoClient
      .db()
      .collection<IDataPoint>('dataPoints')
      .count({
        timestamp: {
          $gt: monthStart,
          $lt: monthEnd,
        },
        regionId,
      })
      .catch((_e) => {
        throw new AppError(
          500,
          'CountDataPointsQuery: could not perform query.'
        );
      });

    return count;
  }
}
