#!/usr/bin/node
const request = require('request');
const API_URL = 'https://swapi-api.hbtn.io/api';

if (process.argv.length > 2) {
    const filmId = process.argv[2];
    request(`${API_URL}/films/${filmId}/`, (err, response, body) => {
        if (err) {
            console.error(err);
            return;
        }
        const characters = JSON.parse(body).characters;
        const promises = characters.map(url =>
            new Promise((resolve, reject) => {
                request(url, (error, res, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(body).name);
                    }
                });
            })
        );

        Promise.all(promises)
            .then(names => console.log(names.join('\n')))
            .catch(err => console.error(err));
    });
}
