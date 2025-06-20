var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 5000));

// Serve static files from the current directory
app.use(express.static(__dirname + '/'));

// Serve index.html as the main entry point for the browser game
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


