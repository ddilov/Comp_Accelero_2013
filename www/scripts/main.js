document.addEventListener("deviceready", onDeviceReady, false);
//Activate :active state on device
document.addEventListener("touchstart", function() {}, false);

function onDeviceReady() {
    navigator.splashscreen.hide();
	var accelerometerHelper = new AccelerometerApp();
	accelerometerHelper.run();
}

function AccelerometerApp() {

}

AccelerometerApp.prototype = {
	watchID : null,
	spanX : null,
	spanY: null,
	spanZ: null,
	spanTimeStamp: null,
    
	run: function() {
		var that = this,
    		startButton = document.getElementById("startButton"),
    		stopButton = document.getElementById("stopButton");
        
		that.spanX = document.getElementById("spanDirectionX");
		that.spanY = document.getElementById("spanDirectionY");
		that.spanZ = document.getElementById("spanDirectionZ");
		that.spanTimeStamp = document.getElementById("spanTimeStamp");

		startButton.addEventListener("click", 
									 function() { 
										 that._startWatch.apply(that, arguments)
									 });
		stopButton.addEventListener("click", 
									function() { 
										that._stopWatch.apply(that, arguments)
									});
	},
    
	// Start watching the acceleration
	_startWatch: function() {
		// Only start testing if watchID is currently null.
		var that = this;
		if (that.watchID === null) {
			// Update acceleration every .5 second
			var options = { frequency: 500 };
			that.watchID = navigator.accelerometer.watchAcceleration(function() { 
				that._onAccelerometerSuccess.apply(that, arguments)
			}, 
            function(error) { 
             that._onAccelerometerError.apply(that, arguments)
            }, 
            options);
		}
	},
     
	// Stop watching the acceleration
	_stopWatch: function() {
		var that = this;
		if (that.watchID !== null) {
			var emptyText = "";
			navigator.accelerometer.clearWatch(that.watchID);
			that.watchID = null;
			that.spanX.innerText = emptyText;
			that.spanY.innerText = emptyText;
			that.spanZ.innerText = emptyText;
			that.spanTimeStamp.innerText = emptyText;
		}
	},
 
	//Get a snapshot of the current acceleration
	_onAccelerometerSuccess: function(acceleration) {
		var that = this;
		that.spanX.innerText = acceleration.x;
		that.spanY.innerText = acceleration.y;
		that.spanZ.innerText = acceleration.z;              
		that.spanTimeStamp.innerText = acceleration.timestamp;
	},
    
	//Failed to get the acceleration
	_onAccelerometerError: function(error) {
        //check if we're running in simulator
        if (device.uuid == "e0101010d38bde8e6740011221af335301010333" || device.uuid == "e0908060g38bde8e6740011221af335301010333")
        {
            alert(error);
            this._stopWatch.apply(this, arguments);
        } else
		alert("Невъзможно стартиране на акселерометъра! Грешка: " + error.code );
	}
}