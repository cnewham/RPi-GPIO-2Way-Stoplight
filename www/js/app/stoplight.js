var output = { write : function(message) { outputWrite(message); }, log : function(message) { console.log(message); }}

var light = function (color) {this.color = color; this.on = function() { turnOn(this); }; this.off = function() { turnOff(this); }; this.isOn = false; };

var red = new light("red");
var yellow = new light("yellow");
var green = new light("green");

$(function() {
	red.light = $('#red');
	yellow.light = $('#yellow');
	green.light = $('#green');

	$('#red').click(function (){
		toggleLight(red);
	});

	$('#yellow').click(function (){
		toggleLight(yellow);
	});

	$('#green').click(function (){
		toggleLight(green);
	});

});

// returns the light implementation from a color string
function getLight(color)
{
    switch(color)
    {
        case "red":
            return red;
        case "yellow":
            return yellow;
        case "green":
            return green;
    }
}

// Writes message to the output window in the browser
function outputWrite(message){
	var write = $('#write');

	var out = new Date().toLocaleTimeString() + " : " + message;

	write.append("<li>" + out + "</li>");
	$('#output').scrollTop(write.height());

	console.log(out);
};

// Toggles light on and off. Initiated by the client
function toggleLight(light){
	if (light.isOn)
	{
		output.write("Turn <b>off</b> " + light.color);
		light.off();
	}
	else
	{
		output.write("Turn <b>on</b> " + light.color);
		light.on();
	}

	sendLight({color: light.color, on: light.isOn})
};

// Turns light on and sends request to server
function turnOn(light){
	light.light.removeClass('off').addClass('on');
	light.isOn = true;
};

// Turns light off and sends request to server
function turnOff(light){
	light.light.removeClass('on').addClass('off');
	light.isOn = false;
};