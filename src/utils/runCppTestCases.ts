import testCase from "../types/testCase.type";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

const dockerPath = path
  .join(__dirname, "code_files", "code")
  .replace(/\\/g, "/");

export default async function runCppTestCases(testCases: testCase[]) {
  for (const testCase of testCases) {
    const testPath = path.join(__dirname, "code_files", "code", "input.txt");
    fs.writeFileSync(testPath, testCase.input);


    const runTestCase = `
      docker run --rm \
      --cpus="0.5" \
      --memory="100m" \
      --network=none \
      -v ${dockerPath}:/code \
      -w /code gcc \
      bash -c "timeout 2s ./main < input.txt"
    `;
;

    const result: any = await new Promise((resolve) => {
      exec(runTestCase, (err, stdout, stderr) => {
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
    try {
      fs.unlinkSync(testPath);
    } catch (err) {
      console.warn("Could not delete input.txt:", err);
    }
  }

  return { success: true, message: "All test cases passed!" };
}
