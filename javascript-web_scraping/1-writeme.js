#!/usr/bin/node
const fs = require('fs');
const filePath = process.argv[2];
const stringToWrite = process.argv[3];
try {
  fs.writeFileSync(filePath, stringToWrite, 'utf-8');
} catch (err) {
  console.error(err);
}
