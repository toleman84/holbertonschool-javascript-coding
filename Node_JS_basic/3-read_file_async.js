const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

async function countStudents(filePath) {
  try {
    const data = await readFileAsync(filePath, 'utf8');

    // Split the data into lines.
    const lines = data.split('\n');

    // Create a list of students.
    const students = [];
    for (const line of lines) {
      // Split the line into comma-separated values.

      const values = line.split(',');
      if (values[0] !== 'firstname') {
        // Add the student to the list.
        students.push({
          firstName: values[0],
          major: values[3],
        });
      }
    }

    // Count the number of students in each major.
    const studentCountsByMajor = students.reduce((acc, student) => {
      acc[student.major] = (acc[student.major] || 0) + 1;
      return acc;
    }, {});

    // Log the number of students to the console.
    console.log('Number of students:', students.length);

    // Log the number of students in each field, and the list.
    for (const [major, count] of Object.entries(studentCountsByMajor)) {
      if (count > 1) {
        const studentList = students.filter((student) => student.major === major).map((student) => student.firstName).join(', ');
        console.log(`Number of students in ${major}: ${count}. List: ${studentList}`);
      }
    }

    return students.length;
  } catch (error) {
    throw new Error(`Cannot load the database: ${error.message}`);
  }
}

module.exports = countStudents;
