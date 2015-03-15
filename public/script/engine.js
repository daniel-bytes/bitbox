var context = new AudioContext();

var bassDrum = new SampleChannel(context);
var snareDrum = new SampleChannel(context);

function loadAudio( object ) {
    var url = object.dataset.sample;
    
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
 
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            object.buffer = buffer;
        });
    }
    request.send();
}

function play(object) {
    var bufferSource = context.createBufferSource();
    bufferSource.buffer = object.buffer;
    bufferSource.connect(context.destination);
    bufferSource.start(0);
    object.bufferSource = bufferSource;
}


var kickElement = document.getElementById('kick');
var snareElement = document.getElementById('snare');

kickElement.addEventListener("click", function() {
    bassDrum.play();
});

snareElement.addEventListener("click", function() {
    snareDrum.play();
});

bassDrum.loadAudio(kickElement.dataset.sample);
snareDrum.loadAudio(snareElement.dataset.sample);

window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 81:
            bassDrum.play();
            break;
        case 87:
            snareDrum.play();
            break;
    }
//    console.log(e.keyCode)
})