import { ObjectID } from 'bson';

/**
 * An object describing a country/region pair.
 */
export interface IZone {
  /**
   * The Object ID of this document on MongoDB.
   */
  _id: ObjectID;
  /**
   * The country this zone is in.
   */
  country: string;
  /**
   * The region of this zone. This is the first administrative level below
   * 'country'. In Canada this is a province, in the USA this is a state etc.
   */
  region: string;
  /**
   * GeoJSON describing the bounding polygon of this zone.
   */
  boundingPolygon: any;
}
