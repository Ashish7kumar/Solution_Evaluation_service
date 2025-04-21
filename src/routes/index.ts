import { Router,Request,Response } from "express";
import {evaluationController} from "../controller/evaluation.controller";
const apiRouter = Router();
apiRouter.post("/api",evaluationController);
export default apiRouter;