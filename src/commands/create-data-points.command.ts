import { IDataPoint } from '@/entities/data-point.entity';
import { mongoClientPromise } from '@/util/mongodb';

/**
 * Persists an array of data points in the database.
 */
export class CreateDataPoints {
  /**
   * Executes this command.
   *
   * @param request - An array of data point entities.
   */
  public async execute(request: IDataPoint[]): Promise<void> {
    const mongoClient = await mongoClientPromise;

    if (request.length === 0) return;

    await mongoClient
      .db()
      .collection<IDataPoint>('dataPoints')
      .insertMany(request);
  }
}
