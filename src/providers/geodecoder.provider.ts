import axios, { AxiosInstance } from 'axios';
import rateLimit from 'axios-rate-limit';

import { geodecoderConfig } from '@/util/config';
import { AppError } from '@/util/app-error';

export interface IDecodeRequest {
  lat: number;
  lon: number;
}

export interface IDecodeResponse {
  country?: string;
  region?: string;
}

export interface IMapsResponse {
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  results: Array<{
    types: string[];
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
  }>;
}

/**
 * Decode coordinates using the Google Maps API
 */
export class GeodecoderProvider {
  private api: AxiosInstance = rateLimit(
    axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        key: geodecoderConfig.key,
        language: 'en',
      },
    }),
    { maxRequests: 200, perMilliseconds: 60000 }
  );

  /**
   * Decode a coordinate pair into a country and a region.
   *
   * @param request - An object containing the latitude and longitude.
   * @returns An object with country and region.
   *
   * @throws {AppError(500, 'GeodecoderProvider: failed to search for coordinates.')}
   * Thrown if axios has failed to search for the coordinates on Google's
   * endpoint.
   */
  public async decode(request: IDecodeRequest): Promise<IDecodeResponse> {
    const { lat, lon } = request;

    const { data } = await this.api
      .get<IMapsResponse>('', {
        params: {
          latlng: `${lat},${lon}`,
        },
      })
      .catch((_e) => {
        throw new AppError(
          500,
          'GeodecoderProvider: failed to search for coordinates.'
        );
      });

    const level1Result = data.results.find((r) =>
      r.types.includes('administrative_area_level_1')
    );

    if (!level1Result) return {};

    const country = level1Result.address_components.find((c) =>
      c.types.includes('country')
    );

    const region = level1Result.address_components.find((c) =>
      c.types.includes('administrative_area_level_1')
    );

    return {
      country: country?.long_name,
      region: region?.long_name,
    };
  }
}
