import { ObjectId } from 'bson';

import { IRegion } from '@/entities/region.entity';
import { mongoClientPromise } from '@/util/mongodb';

export interface IExecuteRequest {
  _id: string;
}

export class FindRegionQuery {
  public async execute(request: IExecuteRequest): Promise<IRegion | null> {
    const { _id } = request;
    const mongoClient = await mongoClientPromise;

    const region = await mongoClient
      .db()
      .collection<IRegion>('regions')
      .findOne({ _id: new ObjectId(_id) });

    return region;
  }
}
