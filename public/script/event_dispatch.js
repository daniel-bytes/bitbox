function EventDispatch(window)
{
	this._window = window;
	this._loop = false;
	this._animationLoopEvents = [];
	
	this._requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();
}

EventDispatch.prototype.addAnimationEvent = function(name, callback)
{
	this._animationLoopEvents.push({
		name: name,
		callback: callback
	});
	console.log(this._animationLoopEvents.length)
}

EventDispatch.prototype.removeAnimationEvent = function(name)
{
	this._animationLoopEvents = _(this._animationLoopEvents).reject(function(obj) {
		return obj.name == name;
	});
		console.log(this._animationLoopEvents.length)
}

EventDispatch.prototype.addEventListener = function(name, func)
{
	this._window.addEventListener(name, func);
}

EventDispatch.prototype.dispatchEvent = function(name, detail)
{
	var evt = new CustomEvent(name, { detail: detail });
	
	this._window.dispatchEvent(evt);
}

EventDispatch.prototype.beginAnimationLoop = function()
{
	var $this = this;
	
	var loopFunc = function() {
		if ($this._loop) {
			$this._requestAnimFrame.call(window, loopFunc);
			
			_($this._animationLoopEvents).each(function(obj) {
				obj.callback();
			})
		}
	}
	
	$this._loop = true;
	loopFunc();
}

EventDispatch.prototype.endAnimationLoop = function()
{
	this._loop = false;
}
