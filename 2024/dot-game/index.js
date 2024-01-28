export class DotGame extends HTMLElement {

    evil;
    canvas;
    container;
    ctx;
    width;
    height;
    loopStarted;
    ballDiameter = 3;
    mainDiameter = 6;
    ballsCount = 100;
    maxBallSpeed = 2;
    maxMainSpeed = 6;

    ballsAreCreated = false;
    gameIsStarted = false;
    bestTime = 0.0;

    balls = [];
    keys = [];
    colors = ['#636363'];

    constructor() {
        super();

    }

    connectedCallback() {
        this.canvas = document.querySelector('canvas');
        this.container = document.querySelector('.gameContainer');
        this.ctx = canvas.getContext('2d');
    }

    disconnectedCallback() {
        console.log('disconnected', this);
    }

    initiateBalls() {
        let circ = ((width - 40) + (height - 40)) * 2;
        let side1 = width - 40;
        let side2 = height - 40;
        let side3 = width - 40;
        let side4 = height - 40;
        let xPlacement = 20;
        let yPlacement = 20;
        let seg = (circ / (ballsCount));

        while (balls.length < ballsCount && !ballsAreCreated) {
            let ball = new Ball(
                xPlacement,
                yPlacement,
                random(-maxBallSpeed, maxBallSpeed),
                random(-maxBallSpeed, maxBallSpeed),
                // 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
                colors[random(0, colors.length)],
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
        ballsAreCreated = true;
    }

    loop() {
        if (gameIsStarted) {
            ctx.fillStyle = '#fafafa';
            ctx.fillRect(0, 0, width, height);

            if (!ballsAreCreated) {
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
            if (evil.free) {
                updateTime();
            }
            evil.draw();
            evil.update();
            requestAnimationFrame(loop);
        }
        else {
            checkPressedKeys();
            requestAnimationFrame(loop);
        }
    }

    initGame() {
        this.gameIsStarted = false;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        width = canvas.width;
        height = canvas.height;

        ballsCount = Math.ceil(width / 10);

        evil = new Evil();
        initiateBalls();
        if (!loopStarted) {
            loop();
            loopStarted = true;
        }
    }

}

if ('customElements' in window) {
    customElements.define('dot-game', DotGame);
}