import { IIngestedData } from '@/entities/ingested-data.entity';
import { mongoClientPromise } from '@/util/mongodb';

/**
 * Persists an ingested data entity in the database.
 */
export class CreateIngestedDataCommand {
  /**
   * Executes this command.
   *
   * @param request - An ingested data entity without an id.
   */
  public async execute(request: Omit<IIngestedData, '_id'>): Promise<void> {
    const mongoClient = await mongoClientPromise;

    await mongoClient
      .db()
      .collection<IIngestedData>('ingestedData')
      .insertOne(request);
  }
}
