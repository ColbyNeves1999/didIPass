const students: StudentManager = {};

//Calculates the average for each student added
function calculateAverage(weights: CourseGrades): number {

    let average: number = 0;
    //loops through the array of grades and adds them to average
    for (let i = 0; i < weights.assignmentWeights.length; i += 1) {
        average += (weights.assignmentWeights[i].grade * weights.assignmentWeights[i].weight) / (100 - weights.finalExamWeight);
      }

    return average;

}

function addStudent(newStudentData: NewStudentRequest): boolean {
    // Destructure the name and weights
    const { name, weights } = newStudentData;
  
    //If astudent is already in the list it wont finish trying to add
    if(newStudentData.name in students){
        return false;
    }

    const average = calculateAverage(weights);

    const newStudent: Student =  {name: name, weights: weights, currentAverage: average};

    //Adds student data at student's (a StudentManager) location in the recorded student list
    students[newStudent.name] = newStudent;

    return true;

}

function getStudent(studentName: string): Student | undefined {
    // If the student's name is not in `students`
      // then return undefined
    if(!(studentName in students)){
        return undefined;
    }
    // Return the student's information (their name is the key for `students`)
    return students[studentName];

}

function calculateFinalExamScore(currentAverage: number, finalExamWeight: number, targetScore: number): number {

    //Calculate the final exam score needed to get the targetScore in the class
    let neededGrade = 0;

    neededGrade = (targetScore - ((1 - finalExamWeight) * currentAverage)) / finalExamWeight;

    return neededGrade;

}
  

function getLetterGrade(score: number): string {

  //Return the appropriate letter grade
  if(score >= 90){
    return "A";
  }
  else if(score >= 80){
    return "B";
  }
  else if(score >= 70){
    return "C";
  }
  else if(score >= 60){
    return "D";
  }
  else{
    return "F";
  }
}

function updateStudentGrade( studentName: string, assignmentName: string, newGrade: number): boolean {
  //Get the student name from the path params
  const name:StudentNameParams = {studentName:studentName};

  //Get the student's data from the dataset
  const student = getStudent(name.studentName);

  //If the student was not found
    //return false
  if(!student){
    return false;
  }

  //Search the student's `assignmentWeights` and find the assignment with the matching name using the .find() method
  const assignment = student.weights.assignmentWeights.find((element: string) => element == assignmentName)

  //If the assignment was not found
    //return false
  if(!assignment){
    return false;
  }


  //Set the assignment's grade to the newGrade
  student.weights.assignmentWeights[assignment].grade = newGrade;

  //Then recalculate the student's currentAverage
  student.currentAverage = calculateAverage(student.weights);
 
  //return true since the update completed successfully
  return true;

}

export { students, addStudent, getStudent, calculateFinalExamScore, getLetterGrade, updateStudentGrade };
