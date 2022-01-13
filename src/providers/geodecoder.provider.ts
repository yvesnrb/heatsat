import { booleanPointInPolygon, point } from '@turf/turf';
import { ObjectId } from 'bson';

import { ICountry } from '@/entities/country.entity';
import { IRegion } from '@/entities/region.entity';
import { ListCountriesQuery } from '@/queries/list-countries.query';
import { ListRegionsQuery } from '@/queries/list-regions.query';

export interface IDecodeRequest {
  lat: number;
  lon: number;
}

/**
 * Decode coordinates into a registered region.
 */
export class GeodecoderProvider {
  private countries: ICountry[] = [];

  private regions: IRegion[] = [];

  constructor(
    private listCountriesQuery: ListCountriesQuery,
    private listRegionsQuery: ListRegionsQuery
  ) {}

  /**
   * Decode a coordinate pair into a registered region.
   *
   * @param request - An object containing the latitude and longitude.
   * @returns The ObjectId of the region this coordinate pair is in. Null if
   * there are no registered regions for this coordinate.
   */
  public async decode(request: IDecodeRequest): Promise<ObjectId | null> {
    const { lat, lon } = request;
    let countryId: ObjectId | undefined;

    if (this.countries.length === 0)
      this.countries = await this.listCountriesQuery.execute({});

    if (this.regions.length === 0)
      this.regions = await this.listRegionsQuery.execute({});

    if (lat > 12 || lon > -20) return null;

    for (let c of this.countries) {
      if (booleanPointInPolygon(point([lon, lat]), c.geojson)) {
        countryId = c._id;
        break;
      }
    }

    if (!countryId) return null;

    const countryRegions = this.regions.filter((r) =>
      r.countryId.equals(countryId as ObjectId)
    );

    for (let r of countryRegions) {
      if (booleanPointInPolygon(point([lon, lat]), r.geojson)) {
        return r._id;
      }
    }

    return null;
  }
}
