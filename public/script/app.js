var eventDispatch = new EventDispatch(window);
var context = new AudioContext();

var channels = [
	new SampleChannel(context, "/samples/erase_classics.wav", 0),
	new SampleChannel(context, "/samples/erase_chicagosnare.wav", 1),
	new SampleChannel(context, "/samples/erase_classics.wav", 2),
	new SampleChannel(context, "/samples/erase_chicagosnare.wav", 3)
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


// Setup UI 
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

// Configure Events
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

eventDispatch.beginAnimationLoop(function() {
	// all render functions should be called from here
	seqgrid.render();
	step.render();
})

document.getElementById("start").addEventListener("click", function(e){
    if (e.target.checked) {
        seq.start();
    }
    else {
        seq.stop();
        seq.reset();
    }
});

// Demo code - Test sequence
var demo_sequence = [
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

seq.setAll({
	channels: demo_sequence
})

seqgrid.setAll({
    rows: demo_sequence
})