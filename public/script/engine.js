var context = new AudioContext();

var channels = [
	new SampleChannel(context, "/samples/erase_classics.wav"),
	new SampleChannel(context, "/samples/erase_chicagosnare.wav"),
	new SampleChannel(context, "/samples/erase_classics.wav"),
	new SampleChannel(context, "/samples/erase_chicagosnare.wav")
];

var drumPadsElement = new DrumPadsElement(
								document.getElementById('drumpads'),
								function(i) {
									channels[i].play();
								});

/*
window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 81:
            bassDrumElement.getSampleChannel().play();
            break;
        case 87:
            snareDrumElement.getSampleChannel().play();
            break;
    }
//    console.log(e.keyCode)
});
*/
