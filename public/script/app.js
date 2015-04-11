var eventDispatch = new EventDispatch(window);
var context = new AudioContext();
var keyboard = new KeyboardController(eventDispatch);

var channels = [
	new SampleChannel(context, "/samples/erase_classics.wav", 0),
	new SampleChannel(context, "/samples/erase_chicagosnare.wav", 1),
	new SampleChannel(context, "/samples/erase_classics.wav", 2),
	new SampleChannel(context, "/samples/erase_chicagosnare.wav", 3)
];

var grid = new CanvasGrid({
	name: "drumpads",
	canvas: document.getElementById('drumpads'),
	rows: 2,
	cols: 2,
	borderColor: "black",
	borderRadius: 9,
	color: "yellow",
	enabledColor: "red",
	cellBuffer: 3,
	eventDispatch: eventDispatch
});

eventDispatch.addEventListener("grid.drumpads.mousedown", function(e) {
	grid.set(e.detail.row, e.detail.col, true)
	
	var idx = (e.detail.row * 2) + e.detail.col;
	channels[idx].play();
});

eventDispatch.addEventListener("grid.drumpads.mouseup", function(e) {
	grid.set(e.detail.row, e.detail.col, false);
});


var seq = new Sequencer({
	name: "seq",
	context: context,
	eventDispatch: eventDispatch,
	channels: 4,
	steps: 16,
	bpm: 120,
	noteResolution: 0
});

// Test sequence
seq.setSteps({
	channels: [
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
})

eventDispatch.addEventListener("seq.trigger", function(e) {
    channels[e.detail.channel].play(e.detail.time);
});

eventDispatch.beginAnimationLoop(function() {
	// all render functions should be called from here
	grid.render();
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