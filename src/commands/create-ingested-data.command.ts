import { IIngestedData } from '@/entities/ingested-data.entity';
import { AppError } from '@/util/app-error';
import { mongoClientPromise } from '@/util/mongodb';

/**
 * Persists an ingested data entity in the database.
 */
export class CreateIngestedDataCommand {
  /**
   * Executes this command.
   *
   * @param request - An ingested data entity without an id.
   *
   * @throws {AppError(500, 'CreateIngestedDataCommand: could not create document.')}
   * Thrown if MongoDB could not save the document.
   */
  public async execute(request: Omit<IIngestedData, '_id'>): Promise<void> {
    const mongoClient = await mongoClientPromise;

    await mongoClient
      .db()
      .collection<IIngestedData>('ingestedData')
      .insertOne(request)
      .catch((_e) => {
        throw new AppError(
          500,
          'CreateIngestedDataCommand: could not create document.'
        );
      });
  }
}
