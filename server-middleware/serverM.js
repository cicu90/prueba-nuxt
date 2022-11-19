var request = require('request'); // "Request" library
const app = require('express')()
const bodyParser = require('body-parser')
var express = require('express'); // Express web server framework
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '6de4dce25d8a408296fbf1a959aa801f'; // Your client id
var client_secret = '7bb0ca104c1f4bb28e3335cc6205adba'; // Your secret

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser())

app.get('/login', async function (req, res) {
  //your application requests authorization
  authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  var basicToken = await request.post(authOptions, function (error, response, body) {
    // use the access token to access the Spotify Web API
    res.send(response.body.access_token);
  });
})

app.get('/artists/:accessToken/:query', async function (req, res) {
  var options = {
    url: `https://api.spotify.com/v1/search?q=${req.params.query}&type=artist`,
    headers: {
      'Authorization': `Bearer ${req.params.accessToken}`,
    }
  }
  await request.get(options, function (error, response, body) {
    res.send(response.body);
  })
  console.log(1, 'artista aqui')
});

app.get('/artist/:accessToken/:id', async function (req, res) {
  console.log(22, 'id artists')

  var options = {
    url: `https://api.spotify.com/v1/artists/${req.params.id}`,
    headers: {
      'Authorization': `Bearer ${req.params.accessToken}`,
    }
  }
  await request.get(options, function (error, response, body) {
    console.log(2, 'id artists')
    res.send(response.body);
  })
})

module.exports = app
