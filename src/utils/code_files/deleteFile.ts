import e from "express";
import fs from "fs";
import path from "path";

export async function deleteCppFile(): Promise<void> {
  const filePath = path.join(__dirname,"code", "main.cpp");
  const objPAth = path.join(__dirname,"code", "main");
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
export async function deleteObjFile(): Promise<void> {
  const objPAth = path.join(__dirname,"code", "main.o");
  return new Promise((resolve, reject) => {
    fs.unlink(objPAth, (err) => {
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
