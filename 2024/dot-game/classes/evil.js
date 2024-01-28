import { Shape } from "./shape.js";

export function Evil(canvas) {
    Shape.call(this, canvas.width / 2, canvas.height / 2, 0, 0, true);
    this.canvas = canvas;
    this.color = '#000';
    this.size = 6;
    this.maxSpeed = 6;
    this.free = true;
    this.type = "Evil";
}
Evil.prototype = Object.create(Shape.prototype);
Evil.prototype.constructor = Evil;

Evil.prototype.update = function () {
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

Evil.prototype.checkKeys = function(keys) {
    if (keys[37]) {
        if (this.velX > -this.maxSpeed) {
            this.velX -= 0.6;
        }
    }

    if (keys[39]) {
        if (this.velX < this.maxSpeed) {
            this.velX += 0.6;
        }
    }
    if (keys[40]) {
        if (this.velY < this.maxSpeed) {
            this.velY += 0.6;
        }
    }
    if (keys[38]) {
        if (this.velY > -this.maxSpeed) {
            this.velY -= 0.6;
        }
    }
}