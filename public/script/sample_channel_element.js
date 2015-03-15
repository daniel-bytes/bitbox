function SampleChannelElement(element, context)
{
    var $this = this;
    $this._element = element;
    $this._sampleChannel = new SampleChannel(context);
    
    $this._element.addEventListener("click", function() {
        $this._sampleChannel.play();
    });

    $this._sampleChannel.loadAudio($this._element.dataset.sample);
}

SampleChannelElement.prototype.getSampleChannel = function() 
{
    return this._sampleChannel;
}


