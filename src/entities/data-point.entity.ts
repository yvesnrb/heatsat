import { ObjectID } from 'bson';

import { IHeatReading } from './heat-reading.entity';

/**
 * A data point is the combination of a heat reading and a zone ID.
 */
export interface IDataPoint extends IHeatReading {
  /**
   * The Object ID of this document on MongoDB.
   */
  _id: ObjectID;
  /**
   * The Object ID of the zone document for this reading on MongoDB.
   */
  zoneID: ObjectID;
}
