const request = require('request');
const bluebird = require('bluebird');
const Twit = require('twit');
const fs = require('fs');
const {conKey} = require('./config.js');
const {conSecret} = require('./config.js');
const {accToken} = require('./config.js');
const {accSecret} = require('./config.js');

//declarations
const {myId} = require('./config.js');
let userInfo;
let screenName;
let profileImg;
let tweets = [];
let followers = [];
let messages = [];
let followerInfo;
let messageInfo;

const T = new Twit({
  consumer_key:         conKey,
  consumer_secret:      conSecret,
  access_token:         accToken,
  access_token_secret:  accSecret
});



//     your 5 most recent direct messages
T.get('direct_messages/events/list', {count: 5, screen_name: `${myId}`})
  .then(function(result) {
    messageInfo = result.data;
    console.log(messageInfo);
  })
  .catch((err) => {
    console.error(err.message);
  });

// your 5 most recent friends
T.get('followers/list', {count: 5, screen_name: `${myId}`})
  .then(function(result) {
    followerInfo = result.data;
    followerInfo.users.forEach(follower => {
      let img = follower.profile_image_url;
      let name = follower.name;
      let userName = follower.screen_name;
      let following = follower.following;

      followers.push({img, name, userName, following});
    });
  })
  .catch((err) => {
    console.error(err.message);
  });

// your 5 most recent tweets
T.get(`statuses/user_timeline`, {count: 5, include_rts: false})
  .then(function(result) {
    userInfo = result.data;
    screenName = userInfo[0].user.screen_name;
    profileImg = userInfo[0].user.profile_image_url;

    userInfo.forEach(tweet => {
      tweets.push(tweet.text);
    });
  })
  .catch(function (err) {
    console.log(err.message);
  });

// T.get('lists/statuses', {count: 5, owner_screen_name: 'fallenclouddev', include_rts: false}, function(err, data, response) {
//   console.log(data);
// })

// The template should have spaces for:





//     It should also include your personal Twitter name and profile image at the top of the screen.