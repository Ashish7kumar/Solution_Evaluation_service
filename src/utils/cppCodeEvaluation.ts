import { rejects } from "assert";
import { resolve } from "path";
import { exec } from "child_process";
import path from "path";
import testCase from "../types/testCase.type";
import runCppTestCases from "./runCppTestCases";

export default async function cppCodeEvaluation(): Promise<string> {
   // Assuming the code is in the first test case
  return new Promise((resolve, reject) => {
    const dockerPath = path
    .join(__dirname, "code_files", "code")
    .replace(/\\/g, "/");
  
  const compileCmd = `docker run --rm -v "${dockerPath}:/code" -w /code gcc bash -c "g++ main.cpp -o main"`;

    exec(compileCmd, async (err, stdout, stderr) => {
      if (err) {
        console.error("Compilation Error:", stderr);
        return reject(stderr); 
      }
      console.log("Compilation Success");
      resolve(stdout);
      
      }
    );
    
  });
}
