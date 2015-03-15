function DrumPadsElement(sampleChannels, canvas)
{
    this._sampleChannels = sampleChannels;
    this._canvas = canvas;
}

DrumPadsElement.prototype.render = function()
{
    var canvas = this._canvas;
    var ctx = canvas.getContext("2d");
    
    ctx.rect(3, 3, 95, 95);
    ctx.stroke();
    
    ctx.rect(102, 3, 95, 95);
    ctx.stroke();
    
    ctx.rect(3, 102, 95, 95);
    ctx.stroke();
    
    ctx.rect(102, 102, 95, 95);
    ctx.stroke();
}