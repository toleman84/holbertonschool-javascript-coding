const express = require('express');
const fs = require('fs');
const process = require('process');

const app = express();

// Set the Content-Type header to plain text.
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  next();
});

// Define the "/" route.
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define the "/students" route.
app.get('/students', async (req, res) => {
  // Get the name of the database from the process arguments.
  const database = process.argv[2];

  // Read the CSV file asynchronously.
  const data = await fs.promises.readFile(database, 'utf8');

  // Split the CSV data into lines.
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

  // Generate the response body.
  const responseBody = `This is the list of our students
Number of students: ${students.length}
Number of students in CS: ${studentCountsByMajor.CS}. List: ${students.filter((student) => student.major === 'CS').map((student) => student.firstName).join(', ')}
Number of students in SWE: ${studentCountsByMajor.SWE}. List: ${students.filter((student) => student.major === 'SWE').map((student) => student.firstName).join(', ')}`;

  // Write the response body and end the response.
  res.send(responseBody);
});

// Start the server.
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
