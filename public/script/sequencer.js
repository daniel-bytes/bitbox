function Sequencer(params)
{
	this._context = params.context;
	this._channels = params.channels;
	this._steps = params.steps;
	this._bpm = params.bpm;
	this._clock = setInterval(function() {
		
	}, 100);
	
	console.log(params.context.currentTime)
}

