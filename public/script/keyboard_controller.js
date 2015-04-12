function KeyboardController(params)
{
	this._eventDispatch = params.eventDispatch;
	
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
	var i = -1;
	
	switch (e.keyCode) {
        case 81: i = 0; break; // q
        case 87: i = 1; break; // w
		case 69: i = 2; break; // e
		case 82: i = 3; break; // r
		case 32: {
			if (type === "keydown") {
				this._eventDispatch.dispatchEvent("key.play", {});
			}
			return;
		}
		default: return;
    }
	
	if (type === "keydown") {
		this._eventDispatch.dispatchEvent("key.trigger", { i: i });
	}
	else {
		this._eventDispatch.dispatchEvent("key.release", { i: i });
	}
}