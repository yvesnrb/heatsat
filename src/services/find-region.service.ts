import { IRegion } from '@/entities/region.entity';
import { FindRegionQuery } from '@/queries/find-region.query';

export interface IExecuteRequest {
  _id: string;
}

export class FindRegionService {
  constructor(private findRegionQuery: FindRegionQuery) {}

  public async execute(request: IExecuteRequest): Promise<IRegion | null> {
    const { _id } = request;

    const region = await this.findRegionQuery.execute({ _id });

    return region;
  }
}
