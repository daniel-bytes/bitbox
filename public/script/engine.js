var context = new AudioContext();

var bassDrumElement = new SampleChannelElement(
                                document.getElementById('kick'), 
                                context);

var snareDrumElement = new SampleChannelElement(
                                document.getElementById('snare'), 
                                context);

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

var drumPadsElement = new DrumPadsElement([], document.getElementById('drumpads'));
drumPadsElement.render();
