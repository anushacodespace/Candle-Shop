// src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
if (!uri) throw new Error("Please add MONGO_URI to .env.local");

let clientPromise;

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function connectDB() {
  const client = await clientPromise;
  const db = client.db("candle_shop"); // use your DB name
  return { client, db };
}
