import { IDataPoint } from '@/entities/data-point.entity';
import { ListDataPointsQuery } from '@/queries/list-data-points.query';

export interface IExecuteRequest {
  timeframe: 1 | 6 | 12;
}

/**
 * Lists data points by time frame.
 */
export class ListDataPointsService {
  constructor(
    private listDataPointsQuery: ListDataPointsQuery,
  ) {}

  /**
   * Executes the service.
   *
   * @param request - An object containing the timeframe to query.
   * @returns An array of data point entities.
   */
  public async execute(request: IExecuteRequest): Promise<IDataPoint[]> {
    const { timeframe } = request;
    const list = await this.listDataPointsQuery.execute({
      timeframe,
    });

    return list;
  }
}
