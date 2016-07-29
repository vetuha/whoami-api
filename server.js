var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 8080));

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/", function(request, response) {
    response.end(JSON.stringify(getResponseData(request)));
});

app.get("*", function(request, response) {
  response.end("404!");
});

app.listen(app.get('port'), function () {
  console.log('timestamp-api app listening on port 8080!');
})

function getResponseData(req){
    var ip = req.get('x-forwarded-for') || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    return { 
        ipaddress: ip,
        language: req.get('accept-language').split(',')[0],
        software: req.get('user-agent').split(') ')[0].split(' (')[1]
    };
}