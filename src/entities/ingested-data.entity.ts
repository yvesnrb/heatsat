import { ObjectID } from 'bson';

/**
 * An object describing a CSV data collection by its date, and the status of
 * its processing by this service.
 */
export interface IIngestedData {
  /**
   * The Object ID of this document on MongoDB.
   */
  _id: ObjectID;
  /**
   * The timestamp of this data collection. Because there is only one data
   * collection file per 10 minute timestamp interval, this also serves as an
   * unique identifier for this collection.
   */
  timestamp: Date;
}
