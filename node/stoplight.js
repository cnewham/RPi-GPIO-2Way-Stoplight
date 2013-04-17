watchr = require('watchr');
fs = require('fs');
path = require('path');
var flagDir = "/home/pi/stoplight_io/";

light = function (color) {
	var $this = this;

	$this.color = color; 
	$this.flag = flagDir + $this.color;
	$this.isOn = fs.existsSync($this.flag); 

	$this.on = function() { 
		if (!fs.existsSync($this.flag)) {
			fs.writeFileSync($this.flag, "");
	  		console.log("Created " + $this.color + " flag");
		};

		$this.isOn = true; 
  	};

  	$this.off = function() { 
		if (fs.existsSync($this.flag)) {
			fs.unlinkSync($this.flag);
			console.log("Removed " + $this.color + " flag");
		};

		$this.isOn = false;
  	};
};

lights = {
	"red" : new light("red"),
	"yellow" : new light("yellow"),
	"green" : new light("green")
};

var watcher;
watch = function (callback) {
	watchr.watch({
	    path: flagDir,
	    listeners: {
	        error: function(err){
	            console.log('an error occured:', err);
	        },
	        watching: function(err,watcherInstance,isWatching){
	            if (err) {
	                console.log("ERROR: Watching for flags " + watcherInstance.path + " failed: ", err);
	            } else {
	            	watcher = watcherInstance;
                	console.log("Watching for flags " + flagDir);
	            }
	        },
	        change: function(changeType,filePath,fileCurrentStat,filePreviousStat){
	            var flag = path.basename(filePath);
	            var light = lights[flag];

	            console.log("Flag changed: " + changeType + " " + flag);

            	if (!light) {
            		console.log("Flag " + flag + " not a valid light flag");
            		return;
            	}

            	if (changeType == "create") {
        			light.isOn = true;
            	} else {
        			light.isOn = false;
	          	}

	            callback(light);
	        }
        }
	});
};

unwatch = function() {
	console.log("Unwatching flags " + flagDir);
	watcher.close();
};


// Exports
module.exports = {
  light: light,
  lights: lights,
  watch: watch,
  unwatch: unwatch
};