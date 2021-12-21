import { MongoClient } from 'mongodb';

declare module globalThis {
  let _mongoClient: Promise<MongoClient>;
}
