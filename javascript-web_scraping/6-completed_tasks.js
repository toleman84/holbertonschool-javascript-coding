#!/usr/bin/node
const fs = require("fs");
const filePath = process.argv[1];
try {
  const data = fs.readFileSync(filePath, "utf-8");
  console.log(data);
} catch (err) {
  console.error(err);
}
