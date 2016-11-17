//Adicionando condição de vitória

var canvas;
var ctx;
var timeBefore;

var ball;
var paddle;
var controller;
var brickData;
var bricks;
var placar;

// +1 ball
// down bricks once
// down bricks until break again
// ball faster
// invert controls
// control slower
// dont break


window.onload = function() {
	
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	
	document.addEventListener('keydown', keyHandler);
	document.addEventListener('keyup', keyHandler);
	
	placar = 0;

	paddle = {
		x:canvas.width/2,
		y:canvas.height - 10,
		width:canvas.width*0.12,
		height:canvas.height*0.02,
		speed:0.5
	};





	function defineColor(num){
			if(num==0) return 'Black'; // void
			if(num==1) return 'Lavender'; // nothing
			if(num==2) return 'Yellow'; // +1 ball
			if(num==3) return 'Lime';  // invert controls of paddle
			if(num==4) return 'Tomato';  // //paddle size decrement
			if(num==5) return 'BlueViolet';  // -> white -> orange
			if(num==6) return 'LightSeaGreen';	 // ball speed increment
			if(num==7) return 'Brown'; // down bloks
		}

	function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}



	bricks = [];
	count = 0;
	
	a1 =[
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	[ 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1 ], 
	[ 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1 ],
	[ 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1 ], 
	[ 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1 ],
	[ 1, 2, 3, 4, 5, 6, 6, 6, 5, 4, 3, 2, 1 ], 
	[ 1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 3, 2, 1 ], 
	[ 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1 ], 
	[ 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1 ],
	[ 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1 ], 
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],

   ];

	a =[
	[7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7 ],
	[0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0 ],
	[0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0 ],
	[0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0 ],
	[0, 0, 0, 5, 5, 5, 7, 5, 7, 5, 5, 5, 0, 0, 0 ],
	[0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0 ],
	[0, 0, 5, 5, 5, 5, 5, 7, 5, 5, 5, 5, 5, 0, 0 ],
	[0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0 ], 
	[0, 0, 0, 5, 5, 7, 5, 5, 5, 7, 5, 5, 0, 0, 0 ],
	[0, 0, 0, 5, 5, 5, 7, 7, 7, 5, 5, 5, 0, 0, 0 ],
	[0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0 ],
	[0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0 ],

   ];

   	a2 =[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0 ],
	[0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0 ],
	[0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0 ],
	[0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2, 0, 0, 0 ],
	[0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0 ],
	[0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0 ],
	[0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0 ], 
	[0, 0, 0, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0, 0, 0 ],
	[0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0 ],
	[0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0 ],
	//[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],

   ];


  	b2 = [
  	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  	]

	b =[
	[5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5 ],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5 ], 
	[5, 1, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5, 1, 5 ],
	[5, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 5 ],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
	[7, 7, 7, 7, 7, 7, 4, 3, 4, 7, 7, 7, 7, 7, 7 ],

   ];

   time = 0;

   cenario = b;
    b = cenario;


	rows = b.length;//getRandomInt(1, 10);
	cols = b[0].length;//getRandomInt(1, 30);
	totalWidth = canvas.width/cols;
	leftSpace = totalWidth*0.2;
	rightSpace = leftSpace;
	width2 = totalWidth-leftSpace-rightSpace ;
	hight2 = width2*0.7;


	ball = [];
	idball = 0;
	ball[0] = {
		radius:width2/2,
		x:paddle.x+paddle.width/2,
		y:canvas.height - paddle.height,
		speed:0.2,
		fill:'Blue',
		dx:1,
		dy:-1
	};
	ball[0].y-=ball[0].radius;
	numBalls = 1;



	brickData = {
	left:leftSpace,
	right:rightSpace,
	width:width2,
	height:hight2,
	topT:10,
	top:leftSpace
	};
	

	for(i=0;i<rows;i++){
		bricks[i] = [];	
		for (var j=0; j < cols  ; j++) {
			//courrentBrickFill = getRandomInt(0, 6);
			courrentBrickFill = b[i][j];
			if(courrentBrickFill==0) count--;
			bricks[i][j] = {
				x:j*brickData.right + (j+1)*brickData.left + j*brickData.width,
				y: brickData.topT + (i+i)*brickData.top + i*brickData.height,
				width:brickData.width,
				height:brickData.height,
				fill:defineColor(courrentBrickFill)
			};
			count ++;
		}
	}
	
	
	controller = {
		right:false,
		left:false
	};
	


	requestAnimationFrame(function(timeStamp) { timeBefore = timeStamp; })
	requestAnimationFrame(onFrame);
}

function onFrame(timeStamp) {
	var delta = getDeltaTime(timeStamp);
	
	update(delta);
	draw();
	
	requestAnimationFrame(onFrame);
}

//increment speed of ball i
function ballInc(porcent,i){
	ball[i].speed += ball[i].speed*porcent/100;
	if(ball[i].speed>=brickData.width/2) ball[i].speed = brickData.width/2;
}

function ballDec(porcent){
	ball[i].speed -= ball[i].speed*porcent/100;
	if(ball[i].speed<=0.1) ball[i].speed = 0.1;
}

function paddleBehaviour(){
	//paddle behaviour
	//paddle.x = ball[0].x - paddle.width/2;
	if(paddle.speed>0){
		if (controller.right && paddle.x + paddle.width < canvas.width)
			paddle.x += paddle.speed*delta;
		if (controller.left && paddle.x > 0)
			paddle.x -= paddle.speed*delta;	
	}
	else{
		if (controller.right  && paddle.x > 0)
			paddle.x += paddle.speed*delta;
		if (controller.left && paddle.x + paddle.width < canvas.width)
			paddle.x -= paddle.speed*delta;	
	}
}



//update ball k
function updateBall(k){
	//ball behaviour
	var dx = ball[k].speed*ball[k].dx*delta;
	var dy = ball[k].speed*ball[k].dy*delta;

	var did = false;
	for( i=0 ; i<bricks.length && did==false ; i++){
		for(j=0 ; j<bricks[i].length && did==false ; j++){
			var brick = bricks[i][j];

			if(brick.fill=='Black')
				continue;

			var ballR = ball[k].x + ball[k].radius;
			var ballL = ball[k].x - ball[k].radius;
			var ballT = ball[k].y - ball[k].radius;
			var ballB = ball[k].y + ball[k].radius;

			var brickR = brick.x + brick.width;
			var brickL = brick.x;
			var brickT = brick.y;
			var brickB = brick.y + brick.height;

			var colX = false;
			var colY = false;
			
			if((ballR + dx >= brickL && ballR <= brickL) || (ballL + dx <= brickR && ballL >= brickR)) {
				if(ballT + dy <= brickB && ballB + dy >= brickT) {
					colX = true;
				}
			}
			if((ballT+ dy <= brickB && ballT >= brickB) || (ballB + dy >= brickT && ballB <= brickT)) {
				if(ballR + dx >= brickL && ballL + dx <= brickR) {
					colY = true;
				}
			}
			
			if(colX || colY) {
				if(colX) {
					ball[k].dx = -ball[k].dx;
					dx = -dx;
				}
				if(colY) {
					ball[k].dy = -ball[k].dy;
					dy = -dy;
				}
				//console.log(tipoColisao);
				//alert(tipoColisao); // + " bR " + ballR + " bL " + ballL + " bT " + ballT + " bB " + ballB + " R " + brickR + " L " + brickL + " T " + brickT + " B " + brickB);
				
				if(bricks[i][j].fill=='BlueViolet'){
					bricks[i][j].fill = 'White';
				} else {
					if(bricks[i][j].fill=='White'){
						bricks[i][j].fill = 'Orange';
					} else {

							setSpecials(bricks[i][j].fill,k)
							placar+=updadePlacar(bricks[i][j].fill);
							document.getElementById("placar").innerHTML = ('00000000'+placar).slice(-7,-1)+("0000000"+placar).slice(-1);
							bricks[i].splice(j, 1); 
							count--;
							time = 0;
					}	
				}
				did = true;
			}
		}
	}


	ball[k].x += dx;
	ball[k].y += dy;

	if (ball[k].x + ball[k].radius >= canvas.width) ball[k].dx = -1;
	else if (ball[k].x - ball[k].radius <= 0) ball[k].dx = 1;
	if (ball[k].y - ball[k].radius <= 0) ball[k].dy = 1;
	else if (ball[k].y + ball[k].radius > canvas.height - paddle.height){
		if (ball[k].x > paddle.x && ball[k].x < paddle.x + paddle.width){
			//ESSA PARTE AQUI
			//ball[k].dy = -1;
			max_angle = 60;
			mid_angle = 45;
			min_angle = 30;
			middle = paddle.x + (0.1*paddle.width);
			if ((ball[k].x > paddle.x) && (ball[k].x < paddle.x+(paddle.width/3))){
				angle = max_angle;
				ball[k].dy = -Math.abs(Math.sin(angle*180/Math.PI));
				ball[k].dx = -Math.abs(Math.cos(angle*180/Math.PI));
				console.log('inicio')
				console.log(angle)
				console.log(ball[k].dx)
				console.log(ball[k].dy)
			}else if (((ball[k].x > paddle.x+(paddle.width*2/3)) && (ball[k].x < paddle.x+paddle.width))){
				angle = min_angle;
				ball[k].dy = -Math.abs(Math.sin(angle*180/Math.PI));
				ball[k].dx = Math.abs(Math.cos(angle*180/Math.PI));
				console.log('fim')
				console.log(angle)
				console.log(ball[k].dx)
				console.log(ball[k].dy)
			}else{
				angle = mid_angle;
				ball[k].dy = -Math.abs(Math.sin(angle*180/Math.PI));
				//ball[k].dx = Math.abs(Math.cos(angle*180/Math.PI));
				console.log('meio')
				console.log(angle)
				console.log(ball[k].dx)
				console.log(ball[k].dy)
			}

		}
		else {
			if(ball[k].y>canvas.height)
			window.location.reload(true);
		}
	}	

}

function dowmBricks(inc){
	for(var i=0 ; i<bricks.length ; i++ ){
		for (var j=0; j<bricks[i].length; j++){
			bricks[i][j].y+=inc;
		}
	}
}



function paddleSizeDec(inc){
	paddle.width = paddle.width - paddle.width * 0.3; 
	if(paddle.width<ball[0].radius) paddle.width = ball[0].radius;
}

function paddleSizeInc(inc){
	paddle.width+=inc;
	if(paddle.width>canvas.width/2) paddle.width = canvas.width/2;
}

function setSpecials(fill,i){

			//if(fill=='Lavender') ballInc(10,i);
			if(fill=='Yellow') {
				ball[numBalls] = {
					radius: ball[i].radius,
					x:ball[i].x,
					y:ball[i].y,
					speed:0.2,
					dx:-ball[i].dx,
					dy:-ball[i].dy,
					born:0
				};
				numBalls++;
			}; //duplicate ball
			if(fill=='Lime') paddle.speed *= -1;  //INVERT CONTROLS OF PADDLE
			if(fill=='Tomato') paddleSizeDec(10);  //paddle size decrement
			if(fill=='LightSeaGreen') ballInc(5,i); //ball speed increment
			if(fill=='Brown') dowmBricks(brickData.height);

}


function newBall(i){
	ball[numBalls] = {
		radius:ball[i].radius,
		x:ball[i].x,
		y:ball[i].y,
		speed:0.2,
		fill:'Blue',
		dx:-ball[i].dx,
		dy:-ball[i].dy
	};
	numBalls++;
}


function updadePlacar(fill){

		if(fill=='Lavender') return 5;
		if(fill=='Yellow') return 10; //duplicate ball
		if(fill=='Lime') return 10;  //INVERT CONTROLS OF PADDLE
		if(fill=='Tomato') return 10;  //paddle speed decrement
		if(fill=='LightSeaGreen') return 10;//ball speed increment
		if(fill=='Brown') return 20;
		if(fill=='Orange') return 40;
}


function checkWin(){
	//win condition
	if(count==0){
		window.location.reload(true);
	}	
}

function checkLost(){
	for(var i=0; i<bricks.length; i++){
		for(var j=0; j<bricks[i].length;j++){
			if(bricks[i][j].y > canvas.height){
				window.location.reload(true);
			}
		}
	}
}

function updateBalls(){
	updateBall(0);
	for (var i = 1 ; i < numBalls ; i++) {
		if(ball[i].born<1000*delta){
			updateBall(i);
		}
		else ball[i].born+=1000*delta;
		ball[i].born+=delta;
	};
}

function update(delta) {

	updateBalls();
	
	paddleBehaviour();

	//updateBricks();
	
	checkWin();
}


function drawBall(i) {
	ctx.beginPath();
	ctx.arc(ball[i].x, ball[i].y, ball[i].radius, 0, Math.PI*2);
	ctx.fillStyle = ball[i].fill;
	ctx.fill();
	ctx.closePath();
}

function drawBalls(){
	drawBall(0);
	for (var i = 1; i < numBalls ; i ++ ) {
		if(ball[i].born<1000*delta)
		drawBall(i);
	};
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBalls();
	drawPaddle();
	drawBricks();
}


function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.strokeStyle = 'White';
	ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
	ctx.closePath();
}

function drawBricks() {
	var brick;
	for (var i=0; i<rows; i++)
	for (var j=0; j<bricks[i].length; j++) {
		if(bricks[i][j].fill!='Black'){
			brick = bricks[i][j];
			ctx.beginPath();
			ctx.rect(brick.x, brick.y, brick.width, brick.height);
			ctx.fillStyle = bricks[i][j].fill;
			ctx.fill();
			ctx.strokeStyle = 'White';
			ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
			ctx.closePath();
		}
	}
}

function keyHandler(event) {
	if (event.key === 'ArrowRight')
		controller.right = (event.type === 'keydown');
	if (event.key === 'ArrowLeft')
		controller.left = (event.type === 'keydown');
}

function getDeltaTime(timeStamp) {
	delta  = timeStamp - timeBefore;
	timeBefore = timeStamp;
	return delta;
}
