/**
 * A heat reading received from INPE and parsed.
 */
export interface IHeatReading {
  /**
   * The latitude for this heat reading.
   */
  lat: number;
  /**
   * The longitude for this heat reading.
   */
  lon: number;
  /**
   * The timestamp this reading was made in. This must be in GMT time.
   */
  timestamp: Date;
  /**
   * The name of the satelite which made this reading.
   */
  satellite: TSatellite;
}

/**
 * A registered satellite name.
 */
export type TSatellite =
  | 'METOP-C'
  | 'NOAA-18'
  | 'NOAA-20'
  | 'TERRA_M-M'
  | 'NOAA-19'
  | 'MSG-03'
  | 'GOES-16'
  | 'METOP-B'
  | 'NPP-375'
  | 'NOAA-19D'
  | 'AQUA_M-T'
  | 'AQUA_M-M'
  | 'NOAA-18D'
  | 'NOAA-20D'
  | 'TERRA_M-T';
