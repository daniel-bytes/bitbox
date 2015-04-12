function CanvasGrid(params)
{
	var $this = this;
	
	this._name = params.name;
	this._canvas = params.canvas;
	this._rows = params.rows;
	this._cols = params.cols;
	this._borderColor = params.borderColor;
	this._borderRadius = params.borderRadius;
	this._color = params.color;
	this._enabledColor = params.enabledColor;
	this._cellBuffer = params.cellBuffer;
	this._eventDispatch = params.eventDispatch;
	this._renderRequired = false;;
	
	
	this._cellWidth = (this._canvas.width / this._cols);
	this._cellHeight = (this._canvas.height / this._rows);

	this._canvas.addEventListener("mousedown", function(e) {
		$this._onMouseEvent("mousedown", e);
    });

	this._canvas.addEventListener("mouseup", function(e) {
		$this._onMouseEvent("mouseup", e);
    });
	
	this.init();
	//this.render();
	
	this._eventDispatch.addAnimationEvent(this._name, function() { $this.render() });
}

CanvasGrid.prototype.init = function()
{
	this._cells = [];
	
	for (var r = 0; r < this._rows; r++) {
		var row = [];
		
		for (var c = 0; c < this._cols; c++) {
			row.push({ 
				x: (c * this._cellWidth) + this._cellBuffer, 
				y: (r * this._cellHeight) + this._cellBuffer, 
				w: this._cellWidth - this._cellBuffer, 
				h: this._cellHeight - this._cellBuffer,
				enabled: false,
				cellBuffer: null
			});
		}
		
		this._cells.push(row);
	}
	
	this.flagRenderRequired();
}


CanvasGrid.prototype.flagRenderRequired = function()
{
	this._renderRequired = true;
}

CanvasGrid.prototype.render = function()
{
	if (!this._renderRequired) {
		return;
	}
	
	console.log("rendering");
    var context = this._canvas.getContext("2d");

	for (var r = 0; r < this._rows; r++) {
		for (var c = 0; c < this._cols; c++) {
			var item = this._cells[r][c];
			var color = item.enabled === true ? this._enabledColor : this._color;
			
			var x = item.x;
			var y = item.y;
			var w = item.w;
			var h = item.h;
        	var radius = this._borderRadius;
        	var borderColor = this._borderColor;

			fillRoundRect(context, x, y, w, h, radius, color);
			strokeRoundRect(context, x, y, w, h, radius, borderColor);
		}
	}
	
	this._renderRequired = false;
}

CanvasGrid.prototype.get = function(row, col)
{
	return this._cells[row][col].enabled;
}

CanvasGrid.prototype.set = function(row, col, enabled)
{
	this._cells[row][col].enabled = !!enabled;
	this.flagRenderRequired();
}

CanvasGrid.prototype.setAll = function(data)
{
    // TODO : validate data
	for (var x = 0; x < data.rows.length; x++) {
		var row = data.rows[x];
		
		for (var y = 0; y < row.length; y++) {
			var enabled = row[y];
			this.set(x, y, enabled, null);
		}
	}
}

CanvasGrid.prototype.reset = function()
{
	for (var x = 0; x < this._cells.length; x++) {
		var row = this._cells[x];
		
		for (var y = 0; y < row.length; y++) {
			this.set(x, y, false);
		}
	}
}

CanvasGrid.prototype._onMouseEvent = function(type, e)
{
	var x = e.offsetX;
	var y = e.offsetY;
	var name = this._name + "." + type;
	
	var eventDetail = {
		row: 0,
		col: 0,
		enabled: false
	};
	
	for (var r = 0; r < this._rows; r++) {
		for (var c = 0; c < this._cols; c++) {
			var item = this._cells[r][c]; 
			
			if (x >= item.x && x <= (item.x + item.w)) {
				if (y >= item.y && y <= (item.y + item.h)) {
					eventDetail.row = r;
					eventDetail.col = c;
					eventDetail.enabled = item.enabled;
					
					this._eventDispatch.dispatchEvent(name, eventDetail);
					
					break;
				}
			}
		}
	}
	
	this.flagRenderRequired();
}
