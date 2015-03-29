function EventDispatch(window)
{
	this._window = window;
}

EventDispatch.prototype.addEventListener = function(name, func)
{
	this._window.addEventListener(name, func);
}

EventDispatch.prototype.dispatchEvent = function(evt)
{
	this._window.dispatchEvent(evt);
}