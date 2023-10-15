const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

async function readDatabase(filePath) {
  try {
    const data = await readFileAsync(filePath, 'utf8');

    const students = data.split('\n').map((line) => {
      const values = line.split(',');
      return {
        firstName: values[0],
        major: values[3],
      };
    });

    return {
      cs: students.filter((student) => student.major === 'CS').map((student) => student.firstName),
      swe: students.filter((student) => student.major === 'SWE').map((student) => student.firstName),
    };
  } catch (error) {
    throw new Error(`Cannot read database: ${error.message}`);
  }
}

module.exports = {
  readDatabase,
};
