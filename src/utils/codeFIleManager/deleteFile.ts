import fs from "fs";
import path from "path";

export async function deleteCppFile(): Promise<void> {
  const filePath = path.join(__dirname, "Code", "main.cpp");

  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      
      if (err) {
        console.log("Error occurred while deleting file");
        return reject(err);
      } else {
        console.log("File deleted successfully");
        return resolve();
      }
    });
  });
}
