import { CountDataPointsQuery } from '@/queries/count-data-points.query';
import { subMonths } from 'date-fns';
import { ObjectId } from 'bson';

export interface IExecuteRequest {
  regionId: string;
}

export interface IExecuteResponse {
  thisMonth: number;
  lastMonth: number;
}

export class FindRegionStatsService {
  constructor(private countDataPointsQuery: CountDataPointsQuery) {}

  public async execute(request: IExecuteRequest): Promise<IExecuteResponse> {
    const regionId = new ObjectId(request.regionId);
    const now = new Date();

    const thisMonth = await this.countDataPointsQuery.execute({
      date: now,
      regionId,
    });

    const lastMonth = await this.countDataPointsQuery.execute({
      date: subMonths(now, 1),
      regionId,
    });

    return { thisMonth, lastMonth };
  }
}
