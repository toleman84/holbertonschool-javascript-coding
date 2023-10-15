const { readDatabase } = require('../utils');

class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const database = await readDatabase('./database.csv');

      const responseBody = `This is the list of our students
Number of students in CS: ${database.cs.length}. List: ${database.cs.join(', ')}
Number of students in SWE: ${database.swe.length}. List: ${database.swe.join(', ')}`;

      response.status(200).send(responseBody);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const database = await readDatabase('./database.csv');

      const responseBody = `List: ${database[major].join(', ')}`;

      response.status(200).send(responseBody);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
