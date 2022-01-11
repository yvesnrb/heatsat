import { ObjectID } from 'bson';

/**
 * An object describing a registered region.
 */
export interface IRegion {
  /**
   * The ObjectID of this document on MongoDB.
   */
  _id: ObjectID;
  /**
   * The ObjectID of the country document this region is under.
   */
  countryId: ObjectID;
  /**
   * The name of this region in English.
   */
  name: string;
  /**
   * The GeoJSON describing the bounding polygon of this region.
   */
  geojson: any;
}
