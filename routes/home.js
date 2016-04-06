'use strict'

const express = require('express');
const home = express.Router();
// const db = require('../db/pg');
const request = require('request');
const dotenv = require('dotenv');
dotenv.load();
// const SECRET = process.env.SECRET;
// const expressJWT = require('express-jwt');
// const jwt = require('jsonwebtoken');
const key = process.env.KEY2;

const moment = require('moment');

home.get('/', getImages, (req,res) => {
  var today = moment().format("YYYYMMDD")
  console.log('today', today)
  console.log(res.data)
})

function getImages (req, result, next) {
  var today = moment().format("YYYYMMDD")
  var data = [];
  // for (var i = 1; i < 11; i ++) {
    request.get({url : 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fl=multimedia&begin_date=' + today + '&api-key=' + key}, function(error, response, body) {
      var nyt = JSON.parse(body);
      console.log(nyt.response.docs[1].multimedia[1])
        for (var i = 0; i < nyt.response.docs.length; i++) {
          if (nyt.response.docs[i].multimedia.length !== 0) {
            var obj = {
              image: nyt.response.docs[i].multimedia[1].url
            }
            data.push(obj)
          }
        }
      result.data = data;
      next()
    })
  // }
  // result.data = data;
};


module.exports = home;
