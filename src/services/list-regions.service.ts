import { ObjectId } from 'bson';

import { IRegion } from '@/entities/region.entity';
import { ListRegionsQuery } from '@/queries/list-regions.query';

export interface IExecuteRequest {
  countryId: string;
}

export class ListRegionsService {
  constructor(private listRegionsQuery: ListRegionsQuery) {}

  public async execute(request: IExecuteRequest): Promise<IRegion[]> {
    const { countryId } = request;

    const list = await this.listRegionsQuery.execute({
      filter: {
        countryId: new ObjectId(countryId),
      },
      projection: {
        _id: 1,
        countryId: 1,
        name: 1,
      }
    });

    return list;
  }
}
