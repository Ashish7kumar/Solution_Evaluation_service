import { rejects } from "assert";
import { resolve } from "path";
import { exec } from "child_process";
import path from "path";

export default async function cppCodeEvaluation(): Promise<string> {
  return new Promise((resolve, reject) => {
    const dockerPath = path
    .join(__dirname, "code_files", "code")
    .replace(/\\/g, "/");
  
  const compileCmd = `docker run --rm -v "${dockerPath}:/code" -w /code gcc bash -c "g++ main.cpp -o main"`;
  
    console.log(compileCmd);

    exec(compileCmd, (err, stdout, stderr) => {
      if (err) {
        console.error("Compilation Error:", stderr);
        return reject(stderr); 
      }
      console.log("Compilation Success");
      resolve(stdout);
    });
  });
}
