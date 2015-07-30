var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var preferences = require("sdk/simple-prefs").prefs;
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var panels = require("sdk/panel");
var self = require("sdk/self");
var { ToggleButton } = require('sdk/ui/button/toggle');
var { ActionButton } = require("sdk/ui/button/action");

worker = pageMod.PageMod({
  include: "*",
  contentScriptOptions: {enabled : preferences.enabled},
  contentScriptFile: data.url("content_script.js"),
  onAttach: function(worker) {
    worker.port.on("checkEnabled", function(message) {
      worker.port.emit("enabled", preferences.enabled);
    });
  }
});

var button;
var panel;

var panelEnabled = panels.Panel({
  width: 500,
  height: 120,
  contentURL: self.data.url("panelEnabled.html")
});

var panelDisabled = panels.Panel({
	width: 500,
  height: 120,
  contentURL: self.data.url("panelDisabled.html")
});

if(preferences.enabled){
	panel = panelEnabled;
}
else{
	panel = panelDisabled;
}


updateButton();

function handleClick(){
	if(panel.isShowing){
		panel.hide();
	}
	else{
		preferences.enabled = !preferences.enabled;
		if(preferences.enabled){
			panel = panelEnabled;
		}
		else{
			panel = panelDisabled;
		}

	    panel.show({
		  position: button
	    });
		updateButton();
		worker.port.emit("enabled", preferences.enabled);
		button.state('window', {checked: false});
	}
}

function updateButton(){
	if(preferences.enabled){
		button = ActionButton({
			id: "anticipation",
			label: "Anticipation",
			icon: {
			"16": "./icon16.png",
			"32": "./icon32.png",
			"64": "./icon64.png"
			},
			onClick: handleClick
		});
	}
	else{
		button = ActionButton({
			id: "anticipation",
			label: "Anticipation",
			icon: {
			"16": "./inactive16.png",
			"32": "./inactive32.png",
			"64": "./inactive64.png"
			},
			onClick: handleClick
		});
	}
}