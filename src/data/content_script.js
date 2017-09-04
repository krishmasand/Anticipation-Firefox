var twitch = false;
var url = window.location.href;
twitch = (url.indexOf("twitch.tv") > -1);
var enabled = false;
self.port.emit("checkEnabled", "pointless content");

if(enabled){
	if(location.hostname.match('youtube') || location.hostname.match('twitch') || location.hostname.match('vods')){
		hideTimes();
	}
}

self.port.on("enabled", function(message) {
	 enabled = message;
	if(enabled){
		if(location.hostname.match('youtube') || location.hostname.match('twitch') || location.hostname.match('vods')){
			hideTimes();
		}
	}
});

document.addEventListener('DOMContentLoaded', function() {
	if(enabled){
		if(location.hostname.match('youtube') || location.hostname.match('twitch')){
			hideTimes();
		}
	}
});

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
  	self.port.emit("checkEnabled", "pointless content");
    if (event.propertyName === 'width' && event.target.id === 'progress') {
    	window.onload = function () { hideTimes(); }
		if(enabled){
			if(location.hostname.match('youtube') || location.hostname.match('twitch') || location.hostname.match('vods')){
				hideTimes();
			}
		}
    }
}, true);

function hideTimes(){
	if(!twitch){
		var times = document.getElementsByClassName("video-time")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			vidTime.textContent="Time Hidden";
		}
        times = document.getElementsByClassName("style-scope ytd-thumbnail-overlay-time-status-renderer")
        for (i = 0; i < times.length; i++) {
            var vidTime = times[i];
            vidTime.textContent = "Time Hidden";
        }
		times = document.getElementsByClassName("ytp-time-duration")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			var par1 = vidTime.parentNode
			par1.removeChild(vidTime);
			var repText = document.createTextNode("Time hidden by Anticipation");
		 	par1.appendChild(repText);
			i--;
		}
		times = document.getElementsByClassName("ytp-progress-bar-container")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			vidTime.textContent="Time Hidden by Anticipation for YouTube and Twitch - Use Arrow Keys to seek";
			vidTime.style.textAlign = "center";
		}
		times = document.getElementsByClassName("timestamp")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			var par1 = vidTime.parentNode
			par1.removeChild(vidTime);
			var repText = document.createTextNode("Time hidden by Anticipation for YouTube");
		 	par1.appendChild(repText);
			i--;
		}
	}
	else{
		var times = document.getElementsByClassName("player-seek__time player-seek__time--total")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			vidTime.textContent="Time Hidden by Anticipation for YouTube and Twitch - Use Arrow Keys to seek";
		}
		var times = document.getElementsByClassName("player-slider player-slider--roundhandle js-player-slider")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			var par1 = vidTime.parentNode
			par1.removeChild(vidTime);
			i--;
		}
		var times = document.getElementsByClassName("card__meta card__meta--right")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			vidTime.textContent="Time Hidden by Anticipation";
		}
		var times = document.getElementsByClassName("info")
		for(i = 0; i < times.length; i++){
			var vidTime = times[i];
			var text = vidTime.textContent
			var timeBool = (text.indexOf(":") > -1);
			if(timeBool){
				vidTime.textContent="Time Hidden";
			}
		}
	}
}