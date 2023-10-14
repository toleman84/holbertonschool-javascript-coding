const http = require('http');
const fs = require('fs');
const process = require('process');

const app = http.createServer((req, res) => {
  // Set the Content-Type header to plain text.
  res.setHeader('Content-Type', 'text/plain');

  // Get the URL path.
  const urlPath = req.url;

  // If the URL path is "/", display "Hello Holberton School!".
  if (urlPath === '/') {
    res.write('Hello Holberton School!');
    res.end();
    return;
  }

  // If the URL path is "/students", display the list of students.
  if (urlPath === '/students') {
    // Get the name of the database from the process arguments.
    const database = process.argv[2];

    // Read the CSV file asynchronously.
    fs.readFile(database, 'utf8', async (err, data) => {
      if (err) {
        // Handle the error.
        res.statusCode = 500;
        res.write(err.message);
        res.end();
        return;
      }

      // Split the CSV data into lines.
      const lines = data.split('\n');

      // Create a list of students.
      const students = [];
      for (const line of lines) {
        // Split the line into comma-separated values.
        const values = line.split(',');

        // Add the student to the list.
        students.push({
          name: values[0],
          major: values[1],
        });
      }

      // Count the number of students in each major.
      const studentCountsByMajor = students.reduce((acc, student) => {
        acc[student.major] = (acc[student.major] || 0) + 1;
        return acc;
      }, {});

      // Generate the response body.
      const responseBody = `
This is the list of our students

Number of students: ${students.length}

Number of students in CS: ${studentCountsByMajor['CS']}. List: ${students.filter(student => student.major === 'CS').map(student => student.name).join(', ')}
Number of students in SWE: ${studentCountsByMajor['SWE']}. List: ${students.filter(student => student.major === 'SWE').map(student => student.name).join(', ')}
`;

      // Write the response body and end the response.
      res.write(responseBody);
      res.end();
    });
    return;
  }

  // If the URL path is not recognized, return a 404 error.
  res.statusCode = 404;
  res.write('404 Not Found');
  res.end();
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
