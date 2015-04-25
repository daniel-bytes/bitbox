// see http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
function fillRoundRect(ctx, x, y, width, height, radius, fillStyle) 
{
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();

	ctx.fillStyle = fillStyle;
   	ctx.fill();        
}

function fillTriangle(ctx, x1, y1, x2, y2, x3, y3, fillStyle)
{
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	
	ctx.fillStyle = fillStyle;
	ctx.fill();
}

function strokeRoundRect(ctx, x, y, width, height, radius, strokeStyle) 
{
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();  

	ctx.strokeStyle = strokeStyle;
 	ctx.stroke();   
}

function getClickPosition(e)
{
	var bounds = e.target.getBoundingClientRect();
	var x = e.offsetX ? e.offsetX : (e.pageX - bounds.left);
	var y = e.offsetY ? e.offsetY : (e.pageY - bounds.top);
	
	return { x: x, y: y };
}