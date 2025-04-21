import { Request, Response } from 'express';
import cppCodeEvaluation from '../utils/cppCodeEvaluation';
import runCppTestCases from '../utils/runCppTestCases';
export const evaluationController=async (req:Request, res:Response)=>{
    const { data } = req.body;
    if (!data.code || !data.testCases ||!data.socketId || !data.language) {
         res.status(400).json({ error: 'Invalid Data provided' });
         return;
    }
    try{
    await cppCodeEvaluation(data.code);
    
    }
    catch(err)
    {
        console.log("Compilation"+err);
        res.status(500).json({ error: 'Compilation Error', details: err });
    }
    
}
