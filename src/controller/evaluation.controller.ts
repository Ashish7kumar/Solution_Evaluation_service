import { Request, Response } from 'express';
import cppCodeEvaluation from '../utils/cppCodeEvaluation';
import runCppTestCases from '../utils/runCppTestCases';
import { collection } from '../Config/mongo.config';
import { createCppFile } from '../utils/code_files/createFile';
import { deleteCppFile } from '../utils/code_files/deleteFile';
import axios, { create } from 'axios';

export const evaluationController = async (req: Request, res: Response) => {

  console.log(req.body);
  if (!req.body.code || !req.body.problem_title || !req.body.language) {
    res.status(400).json({ error: 'Invalid Data provided' });
    return;
  }

  let testcase = [];
  try {
    console.log( await collection.countDocuments());
    const UserData = await collection.findOne(
      { title: '2 sum'} 
    );
   
    if (!UserData) {
      res.status(404).json({ error: 'Problem not found' });
      return;
    }
    console.log(UserData);

    testcase = UserData.testCase;
    console.log(testcase);
  } catch (err) {
    console.log("MongoDB" + err);
    res.status(500).json({ error: 'MongoDB connection failed', details: err });
    return;
  }
  
  try {
    await createCppFile(req.body.code);
    console.log("File created successfully");
    await cppCodeEvaluation();
    
  } catch (err) {
    console.log("Compilation" + err);
    res.status(500).json({ error: 'Compilation Error', details: err });
    return;
  }
  finally{
    deleteCppFile();
    console.log("File deleted successfully");
  }

  try {
    await runCppTestCases(testcase,req.body.language);
    res.status(200).json({ message: 'Test cases executed successfully' });
  } catch (err) {
    console.log("Test case" + err);
    res.status(500).json({ error: 'Test case Error', details: err });
  }
};
