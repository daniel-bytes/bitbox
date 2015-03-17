function KeyboardController()
{
	var $this = this;
	
	// Define that the event name is 'build'.
	window.addEventListener("keydown", function(e) {
	    $this.onKeyEvent("keydown", e);
	});

	window.addEventListener("keyup", function(e) {
	    $this.onKeyEvent("keyup", e);
	});
}

KeyboardController.prototype.onKeyEvent = function(type, e)
{
	var $this = this;
	var i = -1;
	
	switch (e.keyCode) {
        case 81: i = 0; break; // q
        case 87: i = 1; break; // w
		case 69: i = 2; break; // e
		case 82: i = 3; break; // r
		default: return;
    }
	
	if (type === "keydown") {
		var evt = new CustomEvent("pad", { detail: { type: "trigger", i: i } });
		window.dispatchEvent(evt);
	}
	else {
		var evt = new CustomEvent("pad", { detail: { type: "release", i: i } });
		window.dispatchEvent(evt);
	}
}