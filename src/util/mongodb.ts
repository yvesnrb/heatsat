import { MongoClient, MongoClientOptions } from 'mongodb';

import { mongoConfig } from '@/util/config';

const options: MongoClientOptions = {};

let client: MongoClient;
let mongoClientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

client = new MongoClient(mongoConfig.uri, options);
mongoClientPromise = client.connect();

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { mongoClientPromise };
