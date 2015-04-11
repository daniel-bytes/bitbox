function Sequencer(params)
{
	this._name = params.name;
	this._context = params.context;
	this._channels = params.channels;
	this._steps = params.steps;
	this._bpm = params.bpm;
	this._noteResolution = params.noteResolution;  // 0 == 16th, 1 == 8th, 2 == quarter note
	this._eventDispatch = params.eventDispatch;
	this._startTime = 0;
	this._isRunning = false;
	this._step = 0;
	this._lookahead = 25.0;
	this._scheduleAheadTime = 0.1;
	this._nextNoteTime = 0.0;

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

Sequencer.prototype.set = function(x, y, v)
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

Sequencer.prototype.setAll = function(data)
{
	for (var x = 0; x < data.channels.length; x++) {
		var channel = data.channels[x];
		
		for (var y = 0; y < channel.length; y++) {
			var v = channel[y];
			
			this.set(x, y, v);
		}
	}
}

Sequencer.prototype.get = function(x, y)
{
	if (x < 0 || x >= this._channels) {
		throw new Error("Invalid channel " + x);
	}
	else if (y < 0 || y >= this._steps) {
		throw new Error("Invalid step " + y);
	}
	
	return this._grid[x][y];
}

Sequencer.prototype.getAll = function()
{
    var data = { channels: [] };
    
    for (var x = 0; x < this._channels; x++) {
        var channel = [];
        
        for (var y = 0; y < this._steps; y++) {
            channel.push(this._grid[x][y])
        }
        
        data.channels.push(channel);
    }
    
    return data;
}

Sequencer.prototype.stop = function()
{
	this._isRunning = false;
	clearInterval(this._interval);
}

Sequencer.prototype.reset = function()
{
    this._startTime = this._context.currentTime;
    this._step = 0;
}

Sequencer.prototype.start = function()
{
    var $this = this;
    
    $this._nextNoteTime = $this._context.currentTime;
	$this._startTime = $this._context.currentTime;
	$this._isRunning = true;
	
	$this._eventDispatch.dispatchEvent(this._name + ".start", { seq: this })
	
    // See http://www.html5rocks.com/en/tutorials/audio/scheduling/
    // for a great explanation of using the setInterval() and context.currentTime clocks together.
    // These 3 functions are mostly copied from https://github.com/cwilso/metronome/blob/master/js/metronome.js
    var scheduleNote = function(beatNumber, time)
    {
        if ( ($this._noteResolution === 1) && (beatNumber%2))
            return; // we're not playing non-8th 16th notes
        if ( ($this._noteResolution === 2) && (beatNumber%4))
            return; // we're not playing non-quarter 8th notes

        // get triggers for the current step
        for (var channel = 0; channel < $this._channels; channel++) {
            var step = beatNumber % $this._steps;
            var velocity = $this.get(channel, step);
            
            $this._eventDispatch.dispatchEvent(
                        $this._name + ".trigger", 
                        { 
                            seq: $this, 
                            time: time,  
                            channel: channel,
                            step: step,
                            velocity: velocity 
                        })
        }
    }
    
    var nextNote = function()
    {
        $this._eventDispatch.dispatchEvent(
                    $this._name + ".step", 
                    { 
                        seq: $this,
                        step: $this._step
                    })
                    
        // Advance current note and time by a 16th note...
        var secondsPerBeat = 60.0 / $this._bpm;
        $this._nextNoteTime += 0.25 * secondsPerBeat;

        if (++($this._step) === 16) {
            $this._step = 0;
        }
    }
    
	var tick = function()
	{
        while ($this._nextNoteTime < $this._context.currentTime + $this._scheduleAheadTime ) {
            scheduleNote($this._step, $this._nextNoteTime);
            nextNote();
        }
	}
	
	$this._interval = setInterval(tick, $this._lookahead)
}



