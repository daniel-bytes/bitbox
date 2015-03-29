var context = new AudioContext();
var keyboard = new KeyboardController();
var eventDispatch = new EventDispatch(window);

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
	grid.render();
	
	var idx = (e.detail.row * 2) + e.detail.col;
	channels[idx].play();
});

eventDispatch.addEventListener("grid.drumpads.mouseup", function(e) {
	grid.set(e.detail.row, e.detail.col, false)
	grid.render();
});