var socket = io.connect(config.socket.server, {port: config.socket.port});

$(function() {
    socketInitialize();
});

function socketInitialize(){
    socket.on('serverMsg', function (data) {
        if (!data)
            return;

        output.write(data.msg);
    });

    socket.on('initialize', function (data) {
        receiveLightArray(data);
    });

    socket.on('stoplight', function (data) {
        receiveLight(data);
    });

    socket.on('connect', function (data) {
        output.write("Socket Connected to " + config.socket.server + ":" + config.socket.port);
    });

    socket.on('disconnect', function (data) {
        output.write("Socket Disconnected from " + config.socket.server + ":" + config.socket.port);
    });

    socket.on('connect_failed', function (data) {
        output.write("ERROR: Cannot connect to " + config.socket.server + ":" + config.socket.port);
    });

    socket.on('error', function (data) {
        output.write("ERROR: Socket Connection error '" + data + "' (" + config.socket.server + ":" + config.socket.port + ")");
    });

    socket.on('reconnecting', function (data) {
        output.write("Attempting to reconnect to " + config.socket.server + ":" + config.socket.port + "...");
    });

    socket.on('reconnected', function (data) {
        output.write("Reconnected to " + config.socket.server + ":" + config.socket.port + "...");
    });

};

// Sends a stoplight event
function sendLight(request){
    if (!socket.socket.connected)
        return;

    output.write("Sending Message..."); 
    socket.emit('stoplight', { color: request.color, on: request.on });
};

// Executed when stoplight event is received
function receiveLight(response){

    var light = getLight(response.color);

    if (response.on)
    {
        output.write("From Server: Turn <b>on</b> " + response.color);
        turnOn(light);
    }
    else
    {
        output.write("From Server: Turn <b>off</b> " + response.color)
        turnOff(light);
    }
};

// Execute when stoplight_init event is received
function receiveLightArray(response){

    $.each(response.lights, function(index, value){
        var light = getLight(value.color);

        if (value.on)
            turnOn(light);
        else
            turnOff(light);
    });
}

