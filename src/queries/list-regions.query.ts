import { Filter, Document } from 'mongodb';

import { IRegion } from '@/entities/region.entity';
import { AppError } from '@/util/app-error';
import { mongoClientPromise } from '@/util/mongodb';

export interface IExecuteRequest {
  filter?: Filter<IRegion>;
  projection?: Document;
}

export class ListRegionsQuery {
  public async execute(request: IExecuteRequest): Promise<IRegion[]> {
    const { filter = {}, projection } = request;
    const mongoClient = await mongoClientPromise;

    const list = await mongoClient
      .db()
      .collection<IRegion>('regions')
      .find(filter, { projection })
      .toArray()
      .catch((_e) => {
        throw new AppError(500, 'ListRegionsQuery: could not perform query.');
      });

    return list;
  }
}
