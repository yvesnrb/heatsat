import { IZone } from '@/entities/zone.entity';
import { mongoClientPromise } from '@/util/mongodb';

export interface IExecuteRequest {
  country: string;
  region: string;
}

/**
 * Find one zone by its country and region.
 */
export class FindZoneQuery {
  /**
   * Executes the query.
   *
   * @param request - An object containing the country and the region to query
   * by.
   * @returns A zone entity if one was found. Null otherwise.
   */
  public async execute(request: IExecuteRequest): Promise<IZone | null> {
    const { country, region } = request;
    const mongoClient = await mongoClientPromise;

    const document = await mongoClient.db().collection<IZone>('zones').findOne({
      region,
      country,
    });

    return document;
  }
}
