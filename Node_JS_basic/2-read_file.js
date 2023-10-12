const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const students = data.split('\n').filter((line) => line.length > 0);

    const studentCount = students.length;
    console.log(`Number of students: ${studentCount}`);

    const fieldCounts = {};
    const studentLists = {};

    for (const student of students) {
      const [field, firstName] = student.split(',');

      if (!fieldCounts[field]) {
        fieldCounts[field] = 0;
        studentLists[field] = [];
      }

      fieldCounts[field]++;
      studentLists[field].push(firstName);
    }

    for (const [field, count] of Object.entries(fieldCounts)) {
      console.log(`Number of students in ${field}: ${count}. List: ${studentLists[field].join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
