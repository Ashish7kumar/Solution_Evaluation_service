import  express from "express";
import cors from "cors";
import apiRouter from "./routes";
import { PORT } from "./Config/server.config";
import { connectDB } from "./Config/mongo.config";
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', apiRouter);
app.listen(PORT,async () => {
  try{
   await connectDB();}
  catch(err){
    console.log("MongoDB connection failed:", err);
    throw err;}
  console.log("Server is running on port " + PORT);
})
