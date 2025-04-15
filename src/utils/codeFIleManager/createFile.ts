import fs from "fs";
import path from "path";

export async function createCppFile(code: string): Promise<void> {
  const directory = path.join(__dirname, "Code");
  const filePath = path.join(directory, "main.cpp");
  

  if (!fs.existsSync(filePath)) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, code, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return reject(err);
        } else {
          console.log("Code written successfully in the folder.");
          return resolve();
        }
      });
    });
  } else {
    console.log("File already exists, skipping creation.");
  }
}
