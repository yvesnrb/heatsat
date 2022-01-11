import { ObjectID } from 'bson';

/**
 * An object describing a registered country.
 */
export interface ICountry {
  /**
   * The Object ID of this document on MongoDB.
   */
  _id: ObjectID;
  /**
   * The name of this country in English.
   */
  name: string;
  /**
   * The GeoJSON describing the bounding polygon of this country.
   */
  geojson: any;
}
