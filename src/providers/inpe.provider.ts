import axios, { AxiosInstance } from 'axios';
import csvParser from 'csv-parser';
import { Stream } from 'stream';
import { parse } from 'node-html-parser';

import { inpeConfig } from '@/util/config';
import { IHeatReading, TSatellite } from '@/entities/heat-reading.entity';

/**
 * Parsed heat reading as it comes from the INPE CSV file.
 */
export interface IRawHeatReading {
  lat: string;
  lon: string;
  data: string;
  satelite: string;
}

export interface IFetchLatestDataInfoResponse {
  fileName: string;
  date: Date;
}

/**
 * Interact with the INPE satellite data directory.
 */
export class InpeProvider {
  private api: AxiosInstance = axios.create({
    baseURL: inpeConfig.url,
    auth: {
      username: inpeConfig.user,
      password: inpeConfig.pass,
    },
  });

  /**
   * Fetch the file name and date of the latest available CSV readings.
   *
   * @returns An object containing 'fileName' and 'date'.
   *
   * @throws {Error('InpeProvider: failed to fetch directory page.')}
   * Thrown if the request to fetch the directory page failed.
   *
   * @throws {Error('InpeProvider: failed to get file name.')}
   * Thrown if the anchor href attribute containing the file name was not found.
   */
  public async fetchLatestDataInfo(): Promise<IFetchLatestDataInfoResponse> {
    const { data: directoryDocument } = await this.api
      .get<string>('/focos/10min')
      .catch((_e) => {
        throw new Error('InpeProvider: failed to fetch directory page.');
      });

    const documentRoot = parse(directoryDocument);
    const tableRows = documentRoot.querySelectorAll('tr');
    const lastValidTableRow = tableRows[tableRows.length - 2];
    const fileName = lastValidTableRow.querySelector('a')?.attributes.href;
    const fileDate = lastValidTableRow.querySelectorAll('td')[2].textContent;

    if (!fileName) throw new Error('InpeProvider: failed to get file name.');

    return {
      fileName: 'focos_abertos_20211221_170000.csv',
      date: new Date('2021-12-21 17:00 GMT'),
    };

    // return {
    //   fileName,
    //   date: new Date(`${fileDate} GMT`),
    // };
  }

  /**
   * Fetch and parse INPE data by its filename.
   *
   * @param fileName - The file name of the data to be fetched.
   * @returns An array of heat readings.
   *
   * @throws {Error('InpeProvider: Failed to download CSV file.')}
   * Thrown if axios has failed to download the relevant CSV file.
   */
  public async fetchData(fileName: string): Promise<IHeatReading[]> {
    const rawData = await new Promise<IRawHeatReading[]>(
      async (resolve, reject) => {
        const results: IRawHeatReading[] = [];

        const response = await this.api.get<Stream>(
          `/focos/10min/${fileName}`,
          {
            responseType: 'stream',
          }
        );

        response.data
          .pipe(csvParser())
          .on('data', (data) => results.push(data))
          .on('error', (error) => reject(error))
          .on('end', () => resolve(results));
      }
    ).catch((_e) => {
      throw new Error('InpeProvider: Failed to download CSV file.');
    });

    const parsedData = rawData.map((d) => ({
      lat: Number(d.lat),
      lon: Number(d.lon),
      timestamp: new Date(`${d.data} GMT`),
      satellite: d.satelite as TSatellite,
    }));

    return parsedData;
  }
}
