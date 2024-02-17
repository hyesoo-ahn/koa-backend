import { MongoClient, ObjectId } from "mongodb";

const MONGOID: any = "admin";
const MONGOPASSWORD: any = process.env.MONGOPASSWORD ? process.env.MONGOPASSWORD : "password";
const DBNAME = process.env.DBNAME ? process.env.DBNAME : "database";

const url = `mongodb://${MONGOID}:${MONGOPASSWORD}@localhost:27017`;
const nodeEnv: string = process.env.NODE_ENV as string;

export const client: any = new MongoClient(url);

export const main = async () => {
  try {
    const connectResult = await client.connect();
    if (connectResult) console.log("connect DB Success!");
  } catch (error) {
    return console.log(error);
  }
};

export const insertOne = async (_collection: string, _data: object) => {
  const insertResult = await client
    .db("database")
    .collection(_collection)
    .insertOne({ ..._data, timestamp: Date.now() });

  return insertResult;
};

export const findOne = async (_collection: string, _data: object) => {
  const findResult = await client
    .db("database")
    .collection(_collection)
    .findOne({ ..._data });

  if (findResult) {
    return findResult;
  } else {
    return {};
  }
};

export const updateOne = async (_collection: string, _id: any, _data: object) => {
  const updateResult = await client
    .db("database")
    .collection(_collection)
    .updateOne({ _id: _id }, { $set: { ..._data } });

  return updateResult;
};

export const deleteOne = async (_collection: string, _id: string) => {
  const deleteResult = await client
    .db("database")
    .collection(_collection)
    .deleteOne({ _id: new ObjectId(`${_id}`) });

  return deleteResult;
};
