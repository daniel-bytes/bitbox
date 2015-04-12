function PadSynth(params)
{
	this._name = params.name;
	this._context = params.context;
	
	// ch1
	this.channels = [];
}

PadSynth.prototype.start = function()
{
	this.channels = [];
	
	for (var i = 0; i < 2; i++)
	{
		var channel = {};
		
		channel.osc = this._context.createOscillator();
		channel.osc.type = (i % 0 == 0 ? "square" : "sawtooth");
		channel.osc.frequency.value = 100 + i + .01;
		
		channel.gain = this._context.createGain();
		channel.gain.gain.value = .75 - (i * .1);
		channel.osc.connect(channel.gain);
		channel.gain.connect(this._context.destination);
		
		channel.freq_lfo = this._context.createOscillator();
		channel.freq_lfo.frequency.value = 1 + (i * 2);
		channel.freq_lfo_gain = this._context.createGain();
		channel.freq_lfo_gain.gain.value = 100;
		channel.freq_lfo.connect(channel.freq_lfo_gain);
		channel.freq_lfo_gain.connect(channel.osc.frequency)
		
		channel.osc.start(0);
		
		//console.log("created channel %i", i);
		//console.log(channel)
		
		this.channels.push(channel);
	}
}

PadSynth.prototype.stop = function()
{
	for (var i = 0; i < this.channels.length; i++) {
		if (this.channels[i]) {
			this.channels[i].osc.stop(0);
			this.channels[i] = null;
		}
	}
}