const express = require('express');
const request = require('request');
const api = require('./js/api');

const app = express();
const port = 3000;

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


app.get('/', (req, res, next) => {
  res.render('index');
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})