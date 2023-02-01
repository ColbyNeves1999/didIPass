const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {

    let average: number = 0;
    for(let i = 0; i < weights.assignmentWeights.length; i += 1){
        average += weights.assignmentWeights[i];
    }

    average = average / weights.assignmentWeights.length;

    return average;

}

function addStudent(newStudentData: NewStudentRequest): boolean {
    // Destructure the name and weights
    const { name, weights } = newStudentData;
  
    if(newStudentData.name in students){
        return false;
    }

    const average = calculateAverage(weights);

    const newStudent: Student =  {name: name, weights: weights, currentAverage: average};

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

export { students, addStudent, getStudent };