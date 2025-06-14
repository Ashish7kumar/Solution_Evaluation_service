import testCase from "../types/testCase.type";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

const dockerPath = path
  .join(__dirname, "code_files", "code")
  .replace(/\\/g, "/");

export default async function runCppTestCases(testCases: testCase[], language: string): Promise<any> {
  for (const testCase of testCases) {
    const testPath = path.join(__dirname, "code_files", "code", "input.txt");
    fs.writeFileSync(testPath, testCase.input);

  if(language==="cpp")
  {
    const runTestCase = `docker run -i --rm -v "C:/Users/2 ashish/Desktop/Solution_Evaluation_service/build/utils/code_files/code:/code" -w /code gcc bash -c "timeout 2s ./main < input.txt"`;

  

    const result: any = await new Promise((resolve) => {
        
      exec(runTestCase, (err, stdout, stderr) => {
        fs.unlinkSync(testPath);
       
        if (err) {
          if (stderr.includes("Terminated")) {
            return resolve({ success: false, error: "TLE", input: testCase.input });
          }
          return resolve({
            success: false,
            error: "Runtime Error",
            details: stderr,
            input: testCase.input,
          });
        }

        const actualOutput = stdout.trim();
        const expectedOutput = testCase.output.trim();
 
        if (actualOutput !== expectedOutput) {
           
          return resolve({
            success: false,
            error: "Wrong Answer",
            input: testCase.input,
            expected: expectedOutput,
            actual: actualOutput,
          });
          
        }

        resolve(null); 
      });
    });
  

    if (result) {
        
      return result; 
    }
  }
    
   
  }
 
  return { success: true, message: "All test cases passed!" };
}
