import  express from "express";
import cors from "cors";
import apiRouter from "./routes";
import { PORT } from "./Config/server.config";
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', apiRouter);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
})
