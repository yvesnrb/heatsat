import { ICountry } from '@/entities/country.entity';
import { AppError } from '@/util/app-error';
import { mongoClientPromise } from '@/util/mongodb';

export class ListCountriesQuery {
  public async execute(): Promise<ICountry[]> {
    const mongoClient = await mongoClientPromise;

    const list = await mongoClient
      .db()
      .collection<ICountry>('countries')
      .find({})
      .toArray()
      .catch((_e) => {
        throw new AppError(500, 'ListCountriesQuery: could not perform query.');
      });

    return list;
  }
}
