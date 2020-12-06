import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl: any = process.env.MONGO_URL;

const client = new MongoClient(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database() {
  if (!client.isConnected()) await client.connect();

  const db = client.db("madi");
  return db;
}

// // const middleware = nextConnect();

// middleware.use(database);

export default database;
