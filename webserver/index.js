
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
var interval = 5000
var xData = []
var yData = []
client.set('command', command, redis.print);

var app = express()
app.use(express.json())

app.all('/*', (req, res, next) =>  {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    return next();
})

app.get('/', (request, response) => {
    response.send('// TODO Angular stuff')
})

app.get('/data', (request, response) => {
    client.set('command', command, redis.print);
    var data = {xData, yData}
      response.send(data)
})


setInterval(() => {
    client.get('xAxis', function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        xData.push(result)
    });
    client.get('yAxis', function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        yData.push(result)
    });
}, interval)


app.post('/command', (request, response) => {
    client.set(request.body.axis, request.body.command, redis.print);
    response.send(request.body)
})

app.post('/interval', (request, response) => {
    interval = request.body.interval
    client.set('interval', request.body.interval, redis.print);
    response.send(request.body)
})


app.listen(port, (error) => {
  if (error) {
    return console.log(`Could not start listening in port: ${port}. Error: ${error}`)
  }
  console.log(`NodeJS Server is listening on ${port}`)
})


