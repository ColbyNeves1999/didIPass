import { Request, Response } from 'express';
import { students, addStudent, getStudent, calculateFinalExamScore, getLetterGrade } from '../models/StudentsModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
    console.log('\nPOST /api/students');
    console.log(req.body);

    const studentData = req.body as NewStudentRequest;// Assign `req.body` as a `NewStudentRequest`
  
    const didAddStudent = addStudent(studentData);// Call the `addStudent` function using the student's data

    //If the student wasn't added properly then the compile will let you know using 409
    if(!didAddStudent){
        res.sendStatus(409);
        return;
    }
 
    // Send status 201 (This means 201 Created)
    res.sendStatus(201);
    
}
 
function getStudentByName(req: Request, res: Response): void {
  
    const { studentName } = req.params as StudentNameParams; // Assign `req.params` as a `StudentNameParams`;
    const student = getStudent(studentName); // get the student's data using function imported from StudentModel
  
    // If `student` is undefined
      // respond with status 404 (Which means 404 Not Found)
      // return immediately
    if(!student){
        res.sendStatus(404);
        return;
    }

    // Respond with the student's information as json
    res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void {
  //Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;
  
  //Get the student's data from the dataset
  const studentData = getStudent(studentName);

  //If the student was not found
  //responds with status 404 Not Found
  //terminate the function
  if(!studentData){
    res.sendStatus(404);
    return;
  }

  //Get the current average and weights from the student's data
  const curAvg = studentData.currentAverage;
  const curWeight = studentData.weights.finalExamWeight;

  let finalNeeded: FinalExamScores = {needForA: 0, needForB: 0, needForC:0, needForD:0};
  //Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  finalNeeded.needForA = calculateFinalExamScore(curAvg, curWeight, 90);
  //Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  finalNeeded.needForB = calculateFinalExamScore(curAvg, curWeight, 80);
  //Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  finalNeeded.needForC = calculateFinalExamScore(curAvg, curWeight, 70);
  //Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  finalNeeded.needForD = calculateFinalExamScore(curAvg, curWeight, 60);

  //Send a JSON response with an object containing the grades needed for an A through D
  res.json(finalNeeded);
  
}

function calcFinalScore(req: Request, res: Response): void {
  //Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;
  
  //Get the student's data from the dataset
  const student = getStudent(studentName);

  //If the student was not found
    //responds with status 404 Not Found
    //terminate the function
    if(!student){
      res.sendStatus(404);
      return;
  }

  //Get the grade data from the request body as the `AssignmentGrade` type
  const gradeData = req.body as AssignmentGrade;

  //Get the current average and weights from the student's data
  const average = student.currentAverage;
  const weight = student.weights.finalExamWeight;

  const overallScore = calculateFinalExamScore(average, weight, gradeData.grade); //Calculate the final score that would receive using their current average and the hypothetical final exam grade.
  const letterGrade = getLetterGrade(overallScore);//Get the letter grade they would receive given this score

  //Send back a JSON response containing their `overallScore` and `letterGrade.
  const yourGrade: FinalGrade = {overallScore: overallScore, letterGrade: letterGrade};
  res.json(yourGrade);
  
}

export { getAllStudents, createNewStudent, getStudentByName, getFinalExamScores, calcFinalScore };
