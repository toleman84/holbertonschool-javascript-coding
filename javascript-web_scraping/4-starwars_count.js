#!/usr/bin/node
const request = require("request");
const url = process.argv[2];
request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    const movies = JSON.parse(body).results;
    const count = movies.filter((movie) => movie.characters.includes("https://swapi-api.hbtn.io/api/people/18/")).length;
    console.log(count);
  }
});
