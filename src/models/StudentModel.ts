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
  
    // the the name is already in `students` 
      // then return false
    for(let i = 0; i < students.)
    // Calculate the student's current average (use the function previously defined)
  
    const newStudent: Student =  // Create a `Student` object using the `name`, `weights` and `currentAverage`

    // Add the new Student to the `students` object. The student's name is the key
  
    // Finally, return true since the student was added
  }