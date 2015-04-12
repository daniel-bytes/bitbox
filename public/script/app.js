var eventDispatch = new EventDispatch(window);
var context = new AudioContext();

var channels = [
	new SampleChannel(context, "/samples/909+klick.wav", 0),
	new SampleChannel(context, "/samples/snare_short2.wav", 1),
	new SampleChannel(context, "/samples/plopp_filter1.wav", 2),
	new SampleChannel(context, "/samples/noicybell.wav", 3)
];

// Setup Sequencer
var seq = new Sequencer({
	name: "sequencer",
	context: context,
	eventDispatch: eventDispatch,
	channels: 4,
	steps: 16,
	bpm: 120,
	noteResolution: 0
});


var padsynth = new PadSynth({
	name: "padsynth",
	context: context
})

// Setup UI 
var transport = new TransportControls({
	name: "transport",
	canvas: document.getElementById("transport"),
	eventDispatch: eventDispatch
})

var seqgrid = new CanvasGrid({
   name: "sequencer.ui",
   canvas: document.getElementById("sequencer"),
   rows: 4,
   cols: 16,
   borderColor: "black",
   borderRadius: 4,
   color: "green",
   enabledColor: "red",
   cellBuffer: 7,
   eventDispatch: eventDispatch
});

var step = new CanvasGrid({
   name: "step.ui",
   canvas: document.getElementById("step"),
   rows: 1,
   cols: 16,
   borderColor: "black",
   borderRadius: 4,
   color: "yellow",
   enabledColor: "red",
   cellBuffer: 4,
   eventDispatch: eventDispatch
});

step.set(0, 0, true)

function onTransportState(state)
{
	switch(state) {
		case TransportStates.Play:
			seq.start();
			padsynth.start();
			break;
		case TransportStates.Pause:
			seq.stop();
			padsynth.stop();
			break;
		case TransportStates.Stop:
			seq.stop();
			seq.reset();
			padsynth.stop();
			step.reset();
			step.set(0, 0, true)
			break;
	}
}

// keyboard
var keyboard = new KeyboardController({
	eventDispatch: eventDispatch
})

// Configure Events
eventDispatch,addEventListener("transport.change", function(e) {
	onTransportState(e.detail.state);
})

eventDispatch.addEventListener("key.play", function(e) {
	var state = transport.getState() === TransportStates.Play ? TransportStates.Pause : TransportStates.Play;
	transport.setState(state);
	onTransportState(state);
});

eventDispatch.addEventListener("sequencer.trigger", function(e) {
    if (e.detail.velocity > 0) {
        channels[e.detail.channel].play(e.detail.time);
    }
});


eventDispatch.addEventListener("sequencer.step", function(e) {
    for (var i = 0; i < step._cols; i++) {
        step.set(0, i, e.detail.step === i);
    }
    
});

eventDispatch.addEventListener("sequencer.ui.mousedown", function(e) {
    var value = seq.get(e.detail.row, e.detail.col);
    var newValue = (value === 0 ? 1 : 0);

	seqgrid.set(e.detail.row, e.detail.col, newValue === 1);
	seq.set(e.detail.row, e.detail.col, newValue);
});

// Start animation loop
eventDispatch.beginAnimationLoop();


// Demo code - Test sequence
var demo_sequence = [
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0]
];

seq.setAll({
	channels: demo_sequence
})

seqgrid.setAll({
    rows: demo_sequence
})