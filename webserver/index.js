const express = require('express')
var redis = require('redis');

if (process.argv.length < 4) {
    console.log('No port or hostname given. Use: npm index.js redis://hostname:port webserverPort');
    return
}

var host = process.argv[2]
var port = process.argv[3]
var client = redis.createClient(host);

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

var command = ""

var xData = -1
var yData = -1

client.set('command', command, redis.print);
client.get('xAxis', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    xData = result
});
client.get('yAxis', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    yData = result
});

var app = express()

app.get('/', (request, response) => {
    response.send('// TODO Angular stuff')
})

app.get('/data', (request, response) => {
    var data = {xData, yData}
      response.send(data)
})

app.get('/command', (request, response) => {
    client.set('command', 'stop', redis.print);
    response.send('stop')
})

app.listen(port, (error) => {
  if (error) {
    return console.log(`Could not start listening in port: ${port}. Error: ${error}`)
  }
  console.log(`NodeJS Server is listening on ${port}`)
})