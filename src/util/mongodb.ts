import { MongoClient, MongoClientOptions } from 'mongodb';

import { mongoConfig } from '@/util/config';

const options: MongoClientOptions = {};

let client: MongoClient;
let mongoClientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClient) {
    client = new MongoClient(mongoConfig.uri, options);
    global._mongoClient = client.connect();
  }
  mongoClientPromise = global._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(mongoConfig.uri, options);
  mongoClientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { mongoClientPromise };
