import { IZone } from '@/entities/zone.entity';
import { AppError } from '@/util/app-error';
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
   *
   * @throws {AppError(500, 'FindZoneQuery: could not perform query.')}
   * Thrown if MongoDB could not perform the query.
   */
  public async execute(request: IExecuteRequest): Promise<IZone | null> {
    const { country, region } = request;
    const mongoClient = await mongoClientPromise;

    const document = await mongoClient
      .db()
      .collection<IZone>('zones')
      .findOne({
        region,
        country,
      })
      .catch((_e) => {
        throw new AppError(500, 'FindZoneQuery: could not perform query.');
      });

    return document;
  }
}
