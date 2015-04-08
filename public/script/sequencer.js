function Sequencer(params)
{
	this._name = params.name;
	this._context = params.context;
	this._channels = params.channels;
	this._steps = params.steps;
	this._bpm = params.bpm;
	this._eventDispatch = params.eventDispatch;
	this._startTime = 0;
	this._isRunning = false;
	
	this._clock = setInterval(function() {
		
	}, 100);
	
	this._grid = [];
	
	this.init();
	
	console.log(params.context.currentTime)
}

Sequencer.prototype.init = function()
{
	var $this = this;
	
	$this._grid = _.range($this._channels).map(function(x) { 
		return _.range($this._steps).map(function() { return 0; }); 
	})
	
	$this._eventDispatch.dispatchEvent(this._name + ".init", { seq: this })
}

Sequencer.prototype.setStep = function(x, y, v)
{
	if (x < 0 || x >= this._channels) {
		throw new Error("Invalid channel " + x);
	}
	else if (y < 0 || y >= this._steps) {
		throw new Error("Invalid step " + y);
	}
	else if (v < 0 || v > 1.0) {
		throw new Error("Invalid value " + v);
	}
	
	this._grid[x][y] = v;
}

Sequencer.prototype.setSteps = function(data)
{
	for (var x = 0; x < data.channels.length; x++) {
		var channel = data.channels[x];
		
		for (var y = 0; y < channel.length; y++) {
			var v = channel[y];
			
			this.setStep(x, y, v);
		}
	}
}

Sequencer.prototype.getStep = function(x, y)
{
	if (x < 0 || x >= this._channels) {
		throw new Error("Invalid channel " + x);
	}
	else if (y < 0 || y >= this._steps) {
		throw new Error("Invalid step " + y);
	}
	
	return this._grid[x][y];
}

Sequencer.prototype.start = function()
{
	this._startTime = this._context.currentTime;
	this._isRunning = true;
	
	$this._eventDispatch.dispatchEvent(this._name + ".start", { seq: this })
}

Sequencer.prototype.stop = function()
{
	this._isRunning = false;
}

Sequencer.prototype.tick = function(tickRate)
{
	if (this._isRunning !== true) {
		return;
	}
	
	// TODO: based on current time, BPM, and tick rate, determine what notes should be queued up
	//       for this frame and send a trigger event
	$this._eventDispatch.dispatchEvent(this._name + ".trigger", { x: 0, y: 0, v: 1, offset: .01 })
}


