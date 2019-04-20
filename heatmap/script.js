const canvas = document.getElementById("the_canvas");
const ctx = canvas.getContext("2d");
const canvas_w = canvas.width = window.innerWidth;
const canvas_h = canvas.height = window.innerHeight;

const randomFloat = (min,max) => Math.random() * (max - min) + min;
const randomInt	= (min,max) => Math.round(randomFloat(min, max));
const distFromTo = (p1,p2) => Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);

const BACKGROUND_COLOR = "#000";
const INTERVAL_IN_MS = 20;

const TILES_IN_X = 100;
const TILES_IN_Y = 50;
const tiles = [];

const BALLS_AMOUNT = 100;
const BALLS_MAX_V = 5;
const balls = [];

var distTreshhold = window.innerHeight/3;
if (distTreshhold < 100)
	distTreshhold = 100;
if (distTreshhold > 500)
	distTreshhold = 500;
const distToAddRatio = 0.2;

class Tile {
	constructor(x,y) {
		this.x = canvas_w * x / TILES_IN_X;
		this.y = canvas_h * y / TILES_IN_Y;
	}
}

class Ball{
	constructor(){
		this.x = randomInt(0, canvas_w);
		this.y = randomInt(0, canvas_h);
		this.dx = randomFloat(-BALLS_MAX_V, BALLS_MAX_V);
		this.dy = randomFloat(-BALLS_MAX_V, BALLS_MAX_V);
	}
	move(){
		this.x += this.dx;
		this.y += this.dy;
		this.checkEdge();
	}
	checkEdge(){
		if (this.x < 0 || this.x > canvas_w || this.y < 0 || this.y > canvas_h){
			this.dx *= -1;
			this.dy *= -1;
			this.move();
		}
	}
}

for(let y = 0; y < TILES_IN_Y; y++) {
	for(let x = 0; x < TILES_IN_X; x++) {
		tiles.push(new Tile(x,y));
	}
}

for(let i = 0; i < BALLS_AMOUNT; i++) {
	balls.push(new Ball());
}

const mainInterval = setInterval(() => {
	drawBackground();
	moveBalls();
	drawTiles();
}, INTERVAL_IN_MS);

function drawBackground() {
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(0, 0, canvas_w, canvas_h);
}

function moveBalls() {
	balls.forEach(ball => ball.move());
}

function drawTiles() {
	for(let i = 0; i < tiles.length; i++) {
		let sum_of_dist = 0;

		for(let j = 0; j < balls.length; j++) {
			let dist = distFromTo(tiles[i], balls[j]);

			let distToAdd = distTreshhold - dist;
			if (distToAdd < 0)
				distToAdd = 0;

			sum_of_dist += distToAdd * distToAddRatio;
		}

		sum_of_dist = Math.round(sum_of_dist);
		ctx.fillStyle = `hsl(${sum_of_dist}, 100%, 50%)`;
		ctx.fillRect(
			tiles[i].x,
			tiles[i].y,
			canvas_w/TILES_IN_X+1,
			canvas_h/TILES_IN_Y+1
		);
	}
}