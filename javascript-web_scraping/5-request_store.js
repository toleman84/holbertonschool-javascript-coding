#!/usr/bin/node
const request = require('request');
const fs = require('fs');

function storeResponse(url, filename) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      fs.writeFile(filename, body, 'utf-8', function (err) {
        if (err) {
          console.log('Error writing file:', err);
        } else {
          console.log('File written successfully.');
        }
      });
    }
  });
}
storeResponse(process.argv[2], process.argv[3]);
