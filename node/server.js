app = require('http').createServer(),
io = require('socket.io').listen(app),

app.listen(8080);

var stoplight = require('./stoplight.js')
var red = stoplight.lights["red"];
var yellow = stoplight.lights["yellow"];
var green = stoplight.lights["green"];

stoplight.watch(sendUpdate);

console.log("Red: " + red.isOn);
console.log("Yellow: " + yellow.isOn);
console.log("Green: " + green.isOn);

// Socket.IO
io.sockets.on('connection', function (socket) {
  
  // Send initial stoplight states
  socket.emit('initialize', {
    lights : 
      [
        { color : red.color, on : red.isOn },
        { color : yellow.color, on : yellow.isOn },
        { color : green.color, on : green.isOn }
      ]
  });

  // Receive any stoplight updates from the client
  socket.on('stoplight', function (data) {
    console.log(data);

    var light = stoplight.lights[data.color];

    if (data.on) {
      stoplight.unwatch();
      light.on();
      stoplight.watch(sendUpdate);
    } else {
      stoplight.unwatch();
      light.off();
      stoplight.watch(sendUpdate);
    };

    socket.emit('serverMsg', { msg: "Server: Message Received. Broadcasting" });
    socket.broadcast.emit('stoplight', { color: data.color, on: data.on });
  });
});

function sendUpdate(light)
{
  console.log("sendUpdate: " + light.color + ", isOn: " + light.isOn);
  io.sockets.emit('stoplight', { color: light.color, on: light.isOn });
};

