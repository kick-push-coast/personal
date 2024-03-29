import { Shape } from "./shape.js";

export class Ball extends Shape {

    constructor(x, y, velX, velY, color, size, exists, canvas) {
        super(x, y, velX, velY, exists);
        this.color = color;
        this.size = size;
        this.canvas = canvas;
        this.type = "Ball";
    }
    
    update() {
        if ((this.x + this.size) >= this.canvas.width) {
            this.x = this.canvas.width - this.size;
            this.velX = -(this.velX);
        }
    
        if ((this.x - this.size) <= 0) {
            this.x = this.size;
            this.velX = -(this.velX);
        }
    
        if ((this.y + this.size) >= this.canvas.height) {
            this.y = this.canvas.height - this.size;
            this.velY = -(this.velY);
        }
    
        if ((this.y - this.size) <= 0) {
            this.y = this.size;
            this.velY = -(this.velY);
        }
    
        this.x += this.velX;
        this.y += this.velY;
    }
}