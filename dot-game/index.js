import { Ball } from "./classes/ball.js";
import { Evil} from "./classes/evil.js";
import { random } from "./utilities/math.js";
import "./components/game-timer.js";
import "./components/game-menu.js";

export class DotGame extends HTMLElement {

    constructor() {
        super();

        this.ballDiameter = 3;
        this.mainDiameter = 6;
        this.ballsCount = 100;
        this.maxBallSpeed = 2;
        this.maxMainSpeed = 6;
    
        this.loopIsStarted = false;
        this.ballsAreCreated = false;
        this.gameIsStarted = false;
    
        this.balls = [];
        this.keys = [];
        this.colors = ['#636363'];

    }

    connectedCallback() {
        this.innerHTML = `
            <style>
               #game-container, dot-game, canvas {
                   height: 100%;
                   width: 100%;
               }
               #game-container {
                   position: relative;
               }
            </style>
            <div id="game-container">
               <game-timer></game-timer>
               <game-menu></game-menu>
               <canvas></canvas>
            </div>
        `
        this.canvas = this.querySelector('canvas');
        this.timer = this.querySelector('game-timer');
        this.menu = this.querySelector('game-menu');
        this.container = this.querySelector('#game-container');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;

        this.addEventListeners();
        this.initGame();
    }

    disconnectedCallback() {
        console.log('disconnected', this);
    }

    addEventListeners() {
        window.addEventListener("keydown", function (e) {
            if (document.activeElement === this.canvas) {
                e.preventDefault();
            }
            this.keys[e.key] = true;
        }.bind(this));
        window.addEventListener("keyup", function (e) {
            if (document.activeElement === this.canvas) {
                e.preventDefault();
            }
            this.keys[e.key] = false;
        }.bind(this));
        document.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                this.timer.setAttribute('game-state', 'pause');
            } else if (this.gameIsStarted) {
                this.timer.setAttribute('game-state', 'start')
            }
        }.bind(this));
    }

    checkPressedKeys() {
        if (this.gameIsStarted) {
            this.evil.checkKeys(this.keys)
        } else if (this.keys[' ']) {
            this.resetGame();
            this.timer.setAttribute('game-state', 'start');
            this.menu.setAttribute('game-state', 'start');
            this.gameIsStarted = true;
        }
    }

    initiateBalls() {
        let circ = ((this.canvas.width - 40) + (this.canvas.height - 40)) * 2;
        let side1 = this.canvas.width - 40;
        let side2 = this.canvas.height - 40;
        let side3 = this.canvas.width - 40;
        let side4 = this.canvas.height - 40;
        let xPlacement = 20;
        let yPlacement = 20;
        let seg = (circ / (this.ballsCount));

        while (this.balls.length < this.ballsCount && !this.ballsAreCreated) {
            let ball = new Ball(
                xPlacement,
                yPlacement,
                random(-this.maxBallSpeed, this.maxBallSpeed),
                random(-this.maxBallSpeed, this.maxBallSpeed),
                this.colors[random(0, this.colors.length)],
                this.ballDiameter,
                true,
                this.canvas
            );
            this.balls.push(ball);

            if (side1 > 0) {
                if ((xPlacement + seg) <= (this.canvas.width - 20)) {
                    xPlacement += seg;
                    side1 -= seg;
                }
                else {
                    yPlacement += (seg - side1);
                    side2 -= (seg - side1);
                    side1 = 0;
                    xPlacement = (this.canvas.width - 20);
                }
            }
            else if (side2 > 0) {
                if ((yPlacement + seg) <= (this.canvas.height - 20)) {
                    yPlacement += seg;
                    side2 -= seg;
                }
                else {
                    xPlacement -= (seg - side2);
                    side3 -= (seg - side2);
                    side2 = 0;
                    yPlacement = (this.canvas.height - 20);
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
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].draw(this.ctx);
        }
        this.evil.draw(this.ctx);
        this.ballsAreCreated = true;
    }

    loop() {
        if (this.gameIsStarted) {
            this.ctx.fillStyle = '#fafafa';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            if (!this.ballsAreCreated) {
                this.initiateBalls();
            }
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].update();
            }
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].draw(this.ctx);
            }
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].collisionDetect(this.balls);
            }
            this.evil.checkKeys(this.keys);
            this.evil.update();
            this.evil.draw(this.ctx);
            if (this.evil.collisionDetect(this.balls)) {
                this.stopGame();
            };
            requestAnimationFrame(this.loop.bind(this));
        }
        else {
            this.checkPressedKeys();
            requestAnimationFrame(this.loop.bind(this));
        }
    }

    stopGame() {
        this.evil.velX = 0;
        this.evil.velY = 0;
        this.evil.free = false;
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].velX = 0;
            this.balls[i].velY = 0;
        }
        this.timer.setAttribute('game-state', 'stop');
        this.menu.setAttribute('game-state', 'stop');
        this.gameIsStarted = false;
    }

    resetGame() {
        this.evil.x = this.canvas.width/2;
        this.evil.y = this.canvas.height/2;
        this.evil.free = true;
        this.evil.velX = 0;
        this.evil.velY = 0;
        this.balls = [];
        this.ballsAreCreated = false;
    }

    initGame() {
        this.gameIsStarted = false;
        this.ballsCount = Math.ceil(this.canvas.width / 10);
        this.evil = new Evil(this.canvas);
        this.initiateBalls();
        if (!this.loopIsStarted) {
            this.loop();
            this.loopIsStarted = true;
        }
    }

}

if ('customElements' in window) {
    customElements.define('dot-game', DotGame);
}