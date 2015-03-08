var context = new AudioContext();


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


var kick = document.getElementById('kick');
var snare = document.getElementById('snare');

kick.addEventListener("click", function() {
    play(kick);
});

snare.addEventListener("click", function() {
    play(snare);
});

loadAudio(kick);
loadAudio(snare);

window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 81:
            play(kick);
            break;
        case 87:
            play(snare);
            break;
    }
//    console.log(e.keyCode)
})