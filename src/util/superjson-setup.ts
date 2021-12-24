import superjson from 'superjson';
import { ObjectID } from 'bson';

superjson.registerCustom<ObjectID, string>(
  {
    isApplicable: (v): v is ObjectID => v instanceof ObjectID,
    serialize: (v) => v.toHexString(),
    deserialize: (v) => new ObjectID(v),
  },
  'objectid'
);
