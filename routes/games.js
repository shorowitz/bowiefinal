'use strict'

const express = require('express');
const games = express.Router();
const db = require('../db/pg');
const request = require('request');
const dotenv = require('dotenv');
dotenv.load();
const SECRET = process.env.SECRET;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const key = process.env.KEY;

games.post('/start', expressJWT({secret: SECRET}), db.createGame, (req, res) => {
  res.send(res.data)
})

var section;

games.post('/search', expressJWT({secret: SECRET}), getAPI, db.insertPhotos, (req, res) => {
  res.send(res.data)
  });

function getAPI (req, result, next) {
  section = req.body.section
  request.get({url : 'http://api.nytimes.com/svc/topstories/v1/' + section + '.json?api-key=' + key}, function(error, response, body) {
    var nyt = JSON.parse(body);
    var data = [];
    for (var i = 0; i < 15; i++) {
      if (nyt.results[i].multimedia !== '' && nyt.results[i].multimedia[4].caption !== '') {
        var obj = {
          section: nyt.results[i].section,
          subsection: nyt.results[i].subsection,
          headline: nyt.results[i].title,
          pub_date: nyt.results[i].published_date,
          article_url: nyt.results[i].url,
          image_url: nyt.results[i].multimedia[4].url,
          caption: nyt.results[i].multimedia[4].caption
        }
        data.push(obj)
      }
    }
    result.data = data;
    next();
  })
};

module.exports = games;
