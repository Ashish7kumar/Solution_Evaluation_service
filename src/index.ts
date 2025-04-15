import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import testCase from "./types/testCase.type";
import { PORT } from "./Config/server.config";
const app=express();

const httpServer=createServer(app);
const io=new Server(httpServer);
io.on("connection",(socket)=>{
     console.log("New socket connection Happened Ashish");
     socket.on("evaluate", ({ code, testCases }: { code: string; testCases: testCase[] }) => {
        console.log(code);
        testCases.forEach((test) => {
          console.log(test);
        });
      });
})

httpServer.listen(PORT,()=>{
    console.log(`Server Started ${PORT}`);
})