const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.get('/', function(req, res) { 
    res.sendFile(__dirname + '/index.html');                
});

app.use('/motor_inferencia', require('./motor_inferencia'));

var server = app.listen(process.env.PORT || PORT);

console.log('Running on http://localhost:' + PORT);

process.on('SIGINT', function() {
  server.close();
  process.exit();
});
