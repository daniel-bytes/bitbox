var TransportStates = {
	None: 0,
	Play: 1,
	Pause: 2,
	Stop: 3
};

function TransportControls(params)
{
	var $this = this;
	this._name = params.name;
	this._canvas = params.canvas;
	this._eventDispatch = params.eventDispatch;
	this._renderRequired = true;
	this._buttonWidth = (this._canvas.width / 3) - 10;
	this._buttonHeight = this._canvas.height - 5;
	this._state = TransportStates.Stop;
	
	this._playCoordinates = {
		x : 0,
		y : 0,
		w : this._buttonWidth,
		h : this._buttonHeight
	};
	
	this._pauseCoordinates = {
		x : (this._canvas.width / 3),
		y : 0,
		w : this._buttonWidth,
		h : this._buttonHeight
	};
	
	this._stopCoordinates = {
		x : (this._canvas.width / 3) * 2,
		y : 0,
		w : this._buttonWidth,
		h : this._buttonHeight
	};
	
	this._inCoordinates = function(x, y, c) {
		return x >= c.x
		    && x <= (c.x + c.w)
		    && y >= c.y
		    && y <= (c.y + c.h);
	}
	
	this._canvas.addEventListener("mousedown", function(e) {
		$this._onMouseEvent("mousedown", e);
    });
	
	this._eventDispatch.addAnimationEvent(this._name, function() { $this.render() });
}

TransportControls.prototype.getState = function()
{
	return this._state;
}

TransportControls.prototype.setState = function(state)
{
	this._state = state;
	this._renderRequired = true;
}

TransportControls.prototype.render = function()
{
	if (!this._renderRequired) {
		return;
	}
	
	var context = this._canvas.getContext("2d");
	var radius = 5;
	var borderColor = "black";
	
	// Play button
	var x = this._playCoordinates.x;
	var y = this._playCoordinates.y;
	var w = this._playCoordinates.w;
	var h = this._playCoordinates.h;
	var color = this._state === TransportStates.Play ? "red" : "yellow";
	fillRoundRect(context, x, y, w, h, radius, color);
	strokeRoundRect(context, x, y, w, h, radius, borderColor);
	
	var m = 5;
	var x1 = x + m, y1 = y + m,
		x2 = x + m, y2 = h - m,
		x3 = w - m, y3 = h / 2
	fillTriangle(context, x1, y1, x2, y2, x3, y3, borderColor);
	
	// Pause button
	x = this._pauseCoordinates.x;
	y = this._pauseCoordinates.y;
	w = this._pauseCoordinates.w;
	h = this._pauseCoordinates.h;
	color = this._state === TransportStates.Pause ? "red" : "yellow";
	fillRoundRect(context, x, y, w, h, radius, color);
	strokeRoundRect(context, x, y, w, h, radius, borderColor);
	x = x + m;
	y = y + m;
	w = w / 4;
	h = h - m - m;
	fillRoundRect(context, x, y, w, h, 0, borderColor); // left bar
	x = x + w + (w / 2);
	fillRoundRect(context, x, y, w, h, 0, borderColor); // right bar
	
	// Stop button
	x = this._stopCoordinates.x;
	y = this._stopCoordinates.y;
	w = this._stopCoordinates.w;
	h = this._stopCoordinates.h;
	color = this._state === TransportStates.Stop ? "red" : "yellow";
	fillRoundRect(context, x, y, w, h, radius, color);
	strokeRoundRect(context, x, y, w, h, radius, borderColor);
	x = x + m + 1;
	y = y + m;
	w = w - m - m - 2;
	h = h - m - m;
	fillRoundRect(context, x, y, w, h, 0, borderColor);
	
	this._renderRequired = false;
}

TransportControls.prototype._onMouseEvent = function(type, e)
{
	var x = e.offsetX;
	var y = e.offsetY;
	
	if (this._inCoordinates(x, y, this._playCoordinates)) {
		this._buttonClicked = TransportStates.Play;
		this._state = TransportStates.Play;
		this._eventDispatch.dispatchEvent(this._name + ".change", { state: this._state });
	}
	else if (this._inCoordinates(x, y, this._pauseCoordinates)) {
		this._buttonClicked = TransportStates.Pause;
		this._state = TransportStates.Pause;
		this._eventDispatch.dispatchEvent(this._name + ".change", { state: this._state });
	}
	else if (this._inCoordinates(x, y, this._stopCoordinates)) {
		this._buttonClicked = TransportStates.Stop;
		this._state = TransportStates.Stop;
		this._eventDispatch.dispatchEvent(this._name + ".change", { state: this._state });
	}
	
	this._renderRequired = true;
}