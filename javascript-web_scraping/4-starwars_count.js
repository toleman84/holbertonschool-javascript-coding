#!/usr/bin/node
const request = require('request');
const url = process.argv[2];
request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    let films = 0;
    const movies = JSON.parse(body).results;
    for (const movie of movies) {
      for (const character of movie.characters) {
        if (character.includes('/people/18')) films++;
      }
    }
    console.log(films);
  }
});
