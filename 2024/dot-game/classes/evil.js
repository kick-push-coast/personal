import { Shape } from "./shape.js";

export class Evil extends Shape {

    constructor(canvas) {
        super(canvas.width / 2, canvas.height / 2, 0, 0, true);
        this.canvas = canvas;
        this.color = '#000';
        this.size = 6;
        this.maxSpeed = 6;
        this.free = true;
        this.type = "Evil";
    }
    
    update() {
        if ((this.x + this.size) >= this.canvas.width) {
            this.x = this.canvas.width - this.size;
            this.velX = this.velX > 0 ? 0 : this.velX;
        }
    
        if ((this.x - this.size) <= 0) {
            this.x = this.size;
            this.velX = this.velX < 0 ? 0 : this.velX;
        }
    
        if ((this.y + this.size) >= this.canvas.height) {
            this.y = this.canvas.height - this.size;
            this.velY = this.velY > 0 ? 0 : this.velY;
        }
    
        if ((this.y - this.size) <= 0) {
            this.y = this.size;
            this.velY = this.velY < 0 ? 0 : this.velY;
        }
    
        if (this.free) {
            this.velX *= 0.95;
            this.velY *= 0.95;
            this.x += this.velX;
            this.y += this.velY;
        }
    }

    checkKeys(keys) {
        if (keys['ArrowLeft']) {
            if (this.velX > -this.maxSpeed) {
                this.velX -= 0.6;
            }
        }
    
        if (keys['ArrowRight']) {
            if (this.velX < this.maxSpeed) {
                this.velX += 0.6;
            }
        }
        if (keys['ArrowDown']) {
            if (this.velY < this.maxSpeed) {
                this.velY += 0.6;
            }
        }
        if (keys['ArrowUp']) {
            if (this.velY > -this.maxSpeed) {
                this.velY -= 0.6;
            }
        }
    }
}