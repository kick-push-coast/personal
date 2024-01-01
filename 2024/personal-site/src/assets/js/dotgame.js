//// GAME OPTIONS ////
let ballDiameter = 3;
let mainDiameter = 6;
let ballsCount = 100;
let maxBallSpeed = 2;
let maxMainSpeed = 6;
/////////////////////




let timeStart = new Date();
let timeDiff, timeCurrent;

let frictionChecked = 0;
let ballsCreated = 0;
let gameStarted = 0;
let bestTime = 0.0;

let img = new Image();

img.onload = function() {
  
}
img.src = "https://p13.zdassets.com/hc/theme_assets/723138/200147841/Cludot6.svg";

let boundary, spawnBoundary, spawnOffset, initialPos;
boundary = 0;
spawnBoundary = -20;
spawnOffset = -20;
initialPos = 20;

let initX = initialPos;
let initY = initialPos;

let balls = [];
let keys = [];
let colors = ['#636363'];

//Generate random number

function random(min,max) {
  let num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//Object Constructors

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function Ball(x, y, velX, velY, color, size, exists) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
  this.type = "Ball";
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

function Evil() {
  Shape.call(this, width/2, height/2, 0, 0, true);
  this.color = '#000';
  this.size = mainDiameter;
  this.maxSpeed = maxMainSpeed;
  this.free = true;
  this.type = "Evil";
}
Evil.prototype = Object.create(Shape.prototype);
Evil.prototype.constructor = Evil;

//Shape Methods

//Draw
Shape.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}


//Update Ball
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width + boundary) {
    this.x = width - this.size + boundary;
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= -boundary) {
    this.x = this.size - boundary;
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height + boundary) {
    this.y = height - this.size + boundary;
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= -boundary) {
    this.y = this.size -boundary;
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
  if(frictionChecked) {
    this.velX *= 0.99;
    this.velY *= 0.99;
  }
}

//Update Evil
Evil.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.x = width - this.size;
    this.velX = 0;
  }

  if ((this.x - this.size) <= 0) {
    this.x = this.size;
    this.velX = 0;
  }

  if ((this.y + this.size) >= height) {
    this.y = height - this.size;
    this.velY = 0;
  }

  if ((this.y - this.size) <= 0) {
    this.y = this.size;
    this.velY = 0;
  }
  
  if (this.free) {
    this.velX *= 0.95;
    this.velY *= 0.95;

    whatKey();
    this.x += this.velX;
    this.y += this.velY;
    this.collisionDetect();
  }
  else {
    if (keys[32]) {
    
      reset();
    }
  }
}

//Collision Detection
Shape.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      let collider = balls[j];
      let dx = this.x - collider.x;
      let dy = this.y - collider.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + collider.size) {      
        handleBounce(this, collider);
      }
    }
  }
}

//Handle Bounce
function handleBounce(ball1, ball2) {
  
  if(ball1.type === "Evil") {
    gameover.style.display = 'flex';
    if (timeDiff > bestTime) {
      bestTime = timeDiff;
      hiScore.style.display = 'flex';
    }
    ball1.velX = 0;
    ball1.velY = 0;
    ball1.free = false;
    for (let i = 0; i < balls.length; i++) {
      balls[i].velX = 0;
      balls[i].velY = 0;
    }
  }
  
  let dx = ball1.x - ball2.x;
  let dy = ball1.y - ball2.y;
  
  let collAngle = Math.atan2(dy, dx);
  
  let magnitude1 = Math.sqrt(ball1.velX * ball1.velX + ball1.velY * ball1.velY);
  let magnitude2 = Math.sqrt(ball2.velX * ball2.velX + ball2.velY * ball2.velY);
  
  let angle1 = Math.atan2(ball1.velY, ball1.velX);
  let angle2 = Math.atan2(ball2.velY, ball2.velX);
  
  let newVelX1 = magnitude1 * Math.cos(angle1 - collAngle);
  let newVelY1 = magnitude1 * Math.sin(angle1 - collAngle);
  let newVelX2 = magnitude2 * Math.cos(angle2 - collAngle);
  let newVelY2 = magnitude2 * Math.sin(angle2 - collAngle);
  
  let finalVelX1 = ((ball1.size - ball2.size) * newVelX1 + (ball2.size + ball2.size) * newVelX2) / (ball1.size + ball2.size);
  let finalVelX2 = ((ball1.size + ball1.size) * newVelX1 + (ball2.size - ball1.size) * newVelX2) / (ball1.size + ball2.size);
  let finalVelY1 = newVelY1;
  let finalVelY2 = newVelY2;
  
  ball1.velX = Math.cos(collAngle)*finalVelX1+Math.cos(collAngle+Math.PI/2)*finalVelY1;
  ball1.velY = Math.sin(collAngle)*finalVelX1+Math.sin(collAngle+Math.PI/2)*finalVelY1;
  ball2.velX = Math.cos(collAngle)*finalVelX2+Math.cos(collAngle+Math.PI/2)*finalVelY2;
  ball2.velY = Math.sin(collAngle)*finalVelX2+Math.sin(collAngle+Math.PI/2)*finalVelY2;
  
  ball1.x = ball1.x + ball1.velX;
  ball1.y = ball1.y + ball1.velY;
  ball2.x = ball2.x + ball2.velX;
  ball2.y = ball2.y + ball2.velY;
  
}

//Detect Focus
let totalTimeAway = 0;
let awayStart, awayEnd;
let goneAway = 0;

window.onfocus = function() {
    if (goneAway) {
      awayEnd = new Date();
      totalTimeAway += awayEnd - awayStart;
      goneAway = 0;
    }
};
window.onblur = function() {
    goneAway = 1;
    awayStart = new Date();
};

//Detect Keyup/Keydown
window.addEventListener("keydown", function (e) {
    if (document.activeElement === canvas) {
        e.preventDefault();
    }
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    if (document.activeElement === canvas) {
        e.preventDefault();
    }
    keys[e.keyCode] = false;
});

function whatKey() {
  if (keys[37]) {
    //velX = -10;
    if (evil.velX > -evil.maxSpeed) {
      evil.velX -= 0.6;
    }
  }

  if (keys[39]) {
    //velX = 10;
    if (evil.velX < evil.maxSpeed) {
      evil.velX += 0.6;
    }
  }
  if (keys[40]) {
    //velY = 10;
    if (evil.velY < evil.maxSpeed) {
      evil.velY += 0.6;
    }
  }
  if (keys[38]) {
    //velY = -10;
    if (evil.velY > -evil.maxSpeed) {
      evil.velY -= 0.6;
    }
  }
  if (keys[32] && !gameStarted) {
    timeStart = new Date();
    menu.style.display = 'none';
    gameStarted = 1;
    totalTimeAway = 0;
  }
}

//Reset balls
export function reset() {
  evil.x = width/2;
  evil.y = height/2;
  evil.free = true;
  evil.velX = 0;
  evil.velY = 0;
  balls = [];
  ballsCreated = 0;
  gameover.style.display = 'none';
  hiScore.style.display = 'none';
  timeStart = new Date();
  totalTimeAway = 0;
}

//Update time
function updateTime(){  
  timeCurrent = new Date();
  timeDiff = timeCurrent - timeStart - totalTimeAway;
  timerCount.textContent = (timeDiff / 1000).toFixed(1);
}

//Initiate Balls
function initiateBalls() {
  let circ = ((width - 40) + (height - 40))*2;
  let side1 = width - 40;
  let side2 = height - 40;
  let side3 = width - 40;
  let side4 = height - 40;
  let xPlacement = initX;
  let yPlacement = initY;
  let forward = true;
  let seg = (circ / (ballsCount));
  
  while (balls.length < ballsCount && ballsCreated == 0) {
    let ball = new Ball(
      xPlacement,
      yPlacement,
      random(-maxBallSpeed, maxBallSpeed),
      random(-maxBallSpeed, maxBallSpeed),
      // 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      colors[random(0,colors.length)],
      ballDiameter,
      true
    );
    balls.push(ball);
    
    if (side1 > 0) {
      if ((xPlacement + seg) <= (width - 20)) {
        xPlacement += seg;
        side1 -= seg;
      } 
      else {
        yPlacement += (seg - side1);
        side2 -= (seg - side1);
        side1 = 0;
        xPlacement = (width - 20);
      }      
    }
    else if (side2 > 0) {
      if ((yPlacement + seg) <= (height - 20)) {
        yPlacement += seg;
        side2 -= seg;
      } 
      else {
        xPlacement -= (seg - side2);
        side3 -= (seg - side2);
        side2 = 0;
        yPlacement = (height - 20);
      }      
    }
    else if (side3 > 0) {
      if ((xPlacement - seg) >= 20) {
        xPlacement -= seg;
        side3 -= seg;
      } 
      else {
        yPlacement -= (seg - side3);
        side4 -= (seg - side3);
        side3 = 0;
        xPlacement = 20;
      }      
    }
    else if (side4 > 0) {
      if ((yPlacement - seg) >= 20) {
        yPlacement -= seg;
        side4 -= seg;
      }      
    }
    
  }
  for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
  }
  evil.draw();
  
  ballsCreated = 1;
}




//// Animation Loop ////
function loop() {
  if (gameStarted) {
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, width, height);

    if (!ballsCreated) {
      initiateBalls();
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].collisionDetect();
    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }
    // for (let i = 0; i < balls.length; i++) {
    //   balls[i].collisionDetect();
    // }
    if (evil.free) {
      updateTime();
    }
    if (balls.length === 0) {
      reset();
    }
    else {
      evil.draw();
      evil.update();
    }
    requestAnimationFrame(loop);
  }
  else {
    whatKey();
    requestAnimationFrame(loop);
  }
}
//////////////////

let evil;
let canvas;
let container;
let menu;
let gameover;
let hiScore;
let ctx;
let timer;
let timerCount;
let width;
let height;
let loopStarted;

export function initGame() {
    //Initiate Game
    gameStarted = 0;
    canvas = document.querySelector('canvas');
    container = document.querySelector('.gameContainer');
    menu = document.querySelector('.menu');
    gameover = document.querySelector('.gameover');
    hiScore = document.querySelector('.hiScore');
    ctx = canvas.getContext('2d');
    timer = document.querySelector('.timer');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    width = canvas.width;
    height = canvas.height;

    ballsCount = Math.ceil(width / 10);

    timerCount = document.createElement('div');
    timerCount.setAttribute('class', 'count');
    timerCount.textContent = "0.0";
    let existing = timer.querySelector(".count");
    if (existing) {
        timer.removeChild(existing);
    }
    timer.appendChild(timerCount);

    evil = new Evil();
    initiateBalls();
    if (!loopStarted) {
        loop();
        loopStarted = true;
    }
}