import { ObjectID } from 'bson';

export type Serialized<T> = T extends Date
  ? string
  : T extends ObjectID
  ? string
  : T extends object
  ? {
      [k in keyof T]: Serialized<T[k]>;
    }
  : T;
