function SampleChannel(context, url)
{
    this._context = context;

	this.loadAudio(url);
}

SampleChannel.prototype.loadAudio = function(url, complete) 
{
    var $this = this;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
 
    request.onload = function() {
        $this._context.decodeAudioData(request.response, function(buffer) {
            $this._buffer = buffer;
            
            if (complete) {
                complete($this);
            }
        });
    }
    request.send();
}

SampleChannel.prototype.play = function() 
{
    var $this = this;
    var context = $this._context;
    var buffer = $this._buffer;
    
    var bufferSource = context.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(context.destination);
    bufferSource.start(0);
    $this.bufferSource = bufferSource;
}
