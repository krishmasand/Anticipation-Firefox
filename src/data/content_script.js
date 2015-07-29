var enabled = false;
self.port.emit("checkEnabled", "pointless content");

if(enabled){
	hideTimes();
}

self.port.on("enabled", function(message) {
	 enabled = message;
	 if(enabled){
	 	hideTimes();
	 }
});

document.addEventListener('DOMContentLoaded', function() {
	if(enabled){
		hideTimes();
	}
});

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
    	window.onload = function () { hideTimes(); }
		if(enabled){
        	hideTimes();
		}
    }
}, true);

function hideTimes(){
		var times = document.getElementsByClassName("video-time")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			vidTime.textContent="Time Hidden";
		}
		times = document.getElementsByClassName("ytp-time-display html5-control")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			var par1 = vidTime.parentNode.removeChild(vidTime);
			i--;
		}
		times = document.getElementsByClassName("ytp-time-display")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			var par1 = vidTime.parentNode.removeChild(vidTime);
			i--;
		}
		times = document.getElementsByClassName("ytp-progress-bar-container")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			var par1 = vidTime.parentNode.removeChild(vidTime);
			i--;
		}
}