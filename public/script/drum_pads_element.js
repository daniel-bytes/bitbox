function DrumPadsElement(canvas, trigger)
{
	var $this = this;
	
    $this._canvas = canvas;
	$this._trigger = trigger;

	var buffer = 3;
	var width = ($this._canvas.width / 2);
	var height = ($this._canvas.height / 2);
	
	$this._coordinates = [
		// top-left
		{ 
			x: buffer, 
			y: buffer, 
			w: width - buffer, 
			h: height - buffer,
			enabled: false
		},
		// top-right
		{ 
			x: width + buffer, 
			y: buffer,
			w: width - buffer, 
			h: height - buffer,
			enabled: false
		},
		// bottom-left
		{
			x: buffer,
			y: height + buffer,
			w: width - buffer,
			h: height - buffer,
			enabled: false
		},
		// bottom-right
		{
			x: width + buffer,
			y: height + buffer,
			w: width - buffer,
			h: height - buffer,
			enabled: false
		}
	];
	
	$this._canvas.addEventListener("mousedown", function(e) {
		$this.onMouseEvent("mousedown", e);
    });

	$this._canvas.addEventListener("mouseup", function(e) {
		$this.onMouseEvent("mouseup", e);
    });

	window.addEventListener("pad", function(e) {
	    $this.onKeyEvent("keydown", e);
	});

	window.addEventListener("pad", function(e) {
	    $this.onKeyEvent("keyup", e);
	});

	$this.render();
}

DrumPadsElement.prototype.render = function()
{
	var radius = 9;
    var context = this._canvas.getContext("2d");
 
	for (var i = 0; i < 4; i++) {
		var x = this._coordinates[i].x;
		var y = this._coordinates[i].y;
		var w = this._coordinates[i].w;
		var h = this._coordinates[i].h;
		var color = this._coordinates[i].enabled ? "red" : "yellow";
		fillRoundRect(context, x, y, w, h, radius, color);
		strokeRoundRect(context, x, y, w, h, radius, "black");
	}
}

DrumPadsElement.prototype.onMouseEvent = function(type, e)
{
	var $this = this;
	
	var x = e.offsetX;
	var y = e.offsetY;
    
	for (var i = 0; i < $this._coordinates.length; i++) {
		var item = $this._coordinates[i];
		
		item.enabled = false;
		
		if (type === "mousedown") {
			if (x >= item.x && x <= (item.x + item.w)) {
				if (y >= item.y && y <= (item.y + item.h)) {
					item.enabled = true;
					$this._trigger(i);
				}
			}
		}
	}
	
	$this.render();
}

DrumPadsElement.prototype.onKeyEvent = function(type, e)
{
	var $this = this;
	var i = e.detail.i;

	var item = $this._coordinates[i];
	item.enabled = (e.detail.type === "trigger");
	
	if (item.enabled) {
		$this._trigger(i);
	}
	
	$this.render();
}
