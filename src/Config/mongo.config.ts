import { MongoClient } from 'mongodb';
import { MONGO_URI,MONGO_COLLECTION,MONGO_DB } from './server.config';
if(!MONGO_URI || !MONGO_DB || !MONGO_COLLECTION) {
  throw new Error("MongoDB connection details are not provided in the environment variables.");
}
const client=new MongoClient(MONGO_URI)
export const connectDB=async ()=>{
  try{
    await client.connect();
    console.log("MongoDB connected successfully");
  }
  catch(err){
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}
export const collection=client.db(MONGO_DB).collection(MONGO_COLLECTION);
