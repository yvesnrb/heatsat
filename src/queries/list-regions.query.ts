import { IRegion } from '@/entities/region.entity';
import { AppError } from '@/util/app-error';
import { mongoClientPromise } from '@/util/mongodb';

export class ListRegionsQuery {
  public async execute(): Promise<IRegion[]> {
    const mongoClient = await mongoClientPromise;

    const list = await mongoClient
      .db()
      .collection<IRegion>('regions')
      .find({})
      .toArray()
      .catch((_e) => {
        throw new AppError(500, 'ListRegionsQuery: could not perform query.');
      });

    return list;
  }
}
