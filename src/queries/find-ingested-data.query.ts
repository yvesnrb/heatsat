import { IIngestedData } from '@/entities/ingested-data.entity';
import { AppError } from '@/util/app-error';
import { mongoClientPromise } from '@/util/mongodb';

/**
 * Find one ingested data document by its timestamp.
 */
export class FindIngestedDataQuery {
  /**
   * Executes this query.
   *
   * @param timestamp - The timestamp of the intended document.
   * @returns An ingested data entity if it exists, null otherwise.
   *
   * @throws {AppError(500, 'FindIngestedQuery: could not perform query.')}
   * Thrown if MongoDB could not perform the query.
   */
  public async execute(timestamp: Date): Promise<IIngestedData | null> {
    const mongoClient = await mongoClientPromise;

    const document = await mongoClient
      .db()
      .collection<IIngestedData>('ingestedData')
      .findOne({ timestamp })
      .catch((_e) => {
        throw new AppError(500, 'FindIngestedQuery: could not perform query.');
      });

    return document;
  }
}
