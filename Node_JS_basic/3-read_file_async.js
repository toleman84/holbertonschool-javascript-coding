const fs = require('fs');

async function countStudents(path) {
  try {
    const data = await fs.promises.readFile(path, 'utf8');
    const students = data.split('\n').filter((line) => line.trim() !== '');

    const fields = new Set();
    const studentsByField = new Map();

    for (const student of students) {
      const [field, firstName] = student.split(',');

      fields.add(field);
      studentsByField.set(field, studentsByField.get(field) || []);
      studentsByField.get(field).push(firstName);
    }

    console.log('Number of students:', students.length);

    for (const field of fields) {
      const studentsInField = studentsByField.get(field);
      console.log(`Number of students in ${field}: ${studentsInField.length}. List: ${studentsInField.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
