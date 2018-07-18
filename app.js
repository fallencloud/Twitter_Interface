const express = require('express');
const request = require('request');
const Twit = require('twit');
const $ = require('cheerio');

const app = express();
const {conKey} = require('./js/config.js');
const {conSecret} = require('./js/config.js');
const {accToken} = require('./js/config.js');
const {accSecret} = require('./js/config.js');
const port = 3000;

//declarations
const {myId} = require('./js/config.js');

const T = new Twit({
  consumer_key:         conKey,
  consumer_secret:      conSecret,
  access_token:         accToken,
  access_token_secret:  accSecret
});

const options = {screen_name: myId, count : 5};
function getTweets(err, data, response){
  console.log(data);
}

//T.get(`statuses/lookup/:${myId}`, options, getTweets);


T.get(`GET statuses/user_timeline`, {screen_name: myId, count: 5}, function(err, data, response) {
  console.log(data)
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})