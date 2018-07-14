const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();

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
