import { ICountry } from '@/entities/country.entity';
import { ListCountriesQuery } from '@/queries/list-countries.query';

export class ListCountriesService {
  constructor(private listCountriesQuery: ListCountriesQuery) {}

  public async execute(): Promise<ICountry[]> {
    const list = await this.listCountriesQuery.execute({
      projection: { _id: 1, name: 1 },
    });
    return list;
  }
}
