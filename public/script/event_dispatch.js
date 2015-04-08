function EventDispatch(window)
{
	this._window = window;
	this._loop = false;
	
	this._requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();
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

EventDispatch.prototype.beginAnimationLoop = function(callback)
{
	var $this = this;
	
	var loopFunc = function() {
		if ($this._loop) {
			$this._requestAnimFrame.call(window, loopFunc);
			callback();
		}
	}
	
	$this._loop = true;
	loopFunc();
}

EventDispatch.prototype.endAnimationLoop = function()
{
	this._loop = false;
}
