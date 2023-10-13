const fs = require('fs');
function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n');
    // Remove empty lines
    const students = lines.filter((line) => line.length > 0);
    // Count the number of students in each field
    const fields = {};
    students.forEach((student) => {
      const field = student.split(',')[3];
      if (!fields[field]) {
        fields[field] = 0;
      }
      fields[field]++;
    });
    // Log the number of students in each field
    console.log(`Number of students: ${students.length}`);
    for (const field in fields) {
      console.log(`Number of students in ${field}: ${fields[field]}. List: ${students.filter((student) => student.split(',')[3] === field).map((student) => student.split(',')[0]).join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
