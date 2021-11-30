const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const radius =10


ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let w = ctx.canvas.width;
let h = ctx.canvas.height;

let points = [
	[183, 74],
	[213, 338],
	[460, 123],
	[586, 242]
]

function GetRandomPosition(width, height){
	x = parseInt(Math.random() * width);
	y = parseInt(Math.random() * height);
	return [x, y];
}

function GetTheClosestPoint(x1, y1, x2, y2){
	let triggerRange = radius + 5
	if (Math.abs(x1-x2) <= triggerRange && Math.abs(y1-y2) <= triggerRange){
		return true;
	}else{
		return false;
	}
}

(function() {
  	function update(){
  		// clear context
  		ctx.clearRect(0, 0, w, h); 
  		// Handle mouse events
		canvas.onmousedown = function(event){
			// loop through each point
			points.forEach(function(point, index){
				// check if the mouse position is close to any point in points array
				let inRange = GetTheClosestPoint(point[0], point[1], event.clientX, event.clientY)
				if (inRange){
					// if it within the range the set the current point position to the mouse position
					canvas.onmousemove = function(e){
						point[0] = e.clientX;
						point[1] = e.clientY;
					}
				}
			});
		}
		canvas.onmouseup = function(event){
			canvas.onmousemove = undefined;
		}
		draw()
  	}
	
  	setInterval(update, 1);
})();



// ctx.stroke()
function draw(){
	
	// drawing the grid
	DrawGrid(w, h);
	// drawing the bezier curve
	ctx.beginPath()
	ctx.lineWidth = 6
	ctx.moveTo(points[0][0], points[0][1])
	ctx.bezierCurveTo(points[1][0], points[1][0], points[2][0], points[2][1], points[3][0], points[3][1])
	ctx.stroke()
	// drawing controll points
	for(var i=0; i<points.length; i++){
		let centerX = points[i][0]
		let centerY = points[i][1]
		ctx.beginPath();
	    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	    ctx.fillStyle = 'white';
	    ctx.fill();
	    ctx.lineWidth = 5;
	    ctx.strokeStyle = '#000000';
	    ctx.stroke();

	    if (i > 0){
	    	ctx.beginPath()
			ctx.lineWidth = 2
			ctx.strokeStyle = "#00aa22"
			ctx.moveTo(centerX, centerY);
			ctx.lineTo(points[i-1][0], points[i-1][1]);
			ctx.stroke();
	    }
	    ctx.font = "20px Arial";
	    ctx.fillStyle = "black"
		ctx.fillText(`(${centerX}, ${centerY})`, centerX + radius, centerY + radius * 2); 
	}
}

function DrawGrid(Width, Height){
	// drawing vertical lines 
	for (var x = 0; x <= Width; x+=10){
		if ( (x%50) !== 0)
		{	
			ctx.beginPath()
			ctx.lineWidth = 1
			ctx.strokeStyle = "#0066ff"
			ctx.moveTo(x, 0);
			ctx.lineTo(x, Height);
			ctx.stroke();
		}
		else
		{
			ctx.beginPath()
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#0000ff"
			ctx.moveTo(x, 0);
			ctx.lineTo(x, Height);
			ctx.stroke();	
		}
	}
	// drawing horizontal lines
	for (var y = 0; y <= Height; y+=10){
		if ( (y%50) !== 0)
		{	
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#0066ff"
			ctx.moveTo(0, y);
			ctx.lineTo(Width, y);
			ctx.stroke();
		}
		else
		{
			ctx.beginPath()
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#0000ff"
			ctx.moveTo(0, y);
			ctx.lineTo(Width, y);
			ctx.stroke();	
		}
	}
}

