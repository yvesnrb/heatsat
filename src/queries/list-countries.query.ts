import { ICountry } from '@/entities/country.entity';
import { AppError } from '@/util/app-error';
import { mongoClientPromise } from '@/util/mongodb';
import { Document } from 'mongodb';

export interface IExecuteRequest {
  projection?: Document;
}

export class ListCountriesQuery {
  public async execute(request: IExecuteRequest): Promise<ICountry[]> {
    const { projection } = request;
    const mongoClient = await mongoClientPromise;

    const list = await mongoClient
      .db()
      .collection<ICountry>('countries')
      .find({}, { projection })
      .toArray()
      .catch((_e) => {
        throw new AppError(500, 'ListCountriesQuery: could not perform query.');
      });

    return list;
  }
}
