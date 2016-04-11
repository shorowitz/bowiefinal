'use strict'

const express = require('express');
const home = express.Router();
const request = require('request');
const dotenv = require('dotenv');
dotenv.load();

const key = process.env.KEY2;

const moment = require('moment');
const _ = require('underscore');

home.get('/', callNYT, (req,res) => {
  var today = moment().format("YYYYMMDD")
  res.data = _.flatten(req.allData)
  res.send(res.data)
})
//
function callNYT (req, res, next) { //Dan Lawrence assisted me with constructing this callback
  if (!req.counter) {
    req.allData =[]
    req.counter =1;
  }
  if (req.counter < 6) {
    getImages(req,res,next);
    req.counter++
  }
  else {
    next();
  }
}

function getImages (req, result, next) {
  var today = moment().format("YYYYMMDD");
  var data = [];
    request.get({url : 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fl=multimedia,headline&begin_date=' + today + '&page=' + req.counter + '&api-key=' + key}, function(error, response, body) {
      var nyt = JSON.parse(body);
        for (var i = 0; i < nyt.response.docs.length; i++) {
          if (nyt.response.docs[i].multimedia.length !== 0) {
            var obj ={
              image : "https://static01.nyt.com/" + nyt.response.docs[i].multimedia[1].url,
              headline : nyt.response.docs[i].headline.main
            }
            data.push(obj)
          }
        }
        req.allData.push(data)
        callNYT(req,result,next)
      })
};


module.exports = home;
