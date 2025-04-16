import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import testCase from "./types/testCase.type";
import { createCppFile } from "./utils/code_files/createFile";
import { deleteCppFile } from "./utils/code_files/deleteFile";
import { deleteObjFile } from "./utils/code_files/deleteFile";
import cppCodeEvaluation from "./utils/cppCodeEvaluation";
import runCppTestCases from "./utils/runCppTestCases";
import { PORT } from "./Config/server.config";
const app=express();
app.use(cors());
const httpServer=createServer(app);
const io=new Server(httpServer, {cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }});
io.on("connection",(socket)=>{
     console.log("New socket connection Happened Ashish");
     const params=socket.handshake.query as {language?:string};
     console.log(params.language);
     socket.on("evaluate", async ({ code, testCases }: { code: string; testCases: testCase[] }) => {
       if(params.language=="C++")
       {
        await createCppFile(code);
        await cppCodeEvaluation(testCases);
        const result=await runCppTestCases(testCases);
      if(result.sucess==false)
      {
        console.log("Test case failed:", result); 
      }
      else{
        console.log("All test cases passed successfully.");
     
      }
        await deleteCppFile();
        await deleteObjFile();
       }
      });
})

httpServer.listen(PORT,()=>{
    console.log(`Server Started ${PORT}`);
})