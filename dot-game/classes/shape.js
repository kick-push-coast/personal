import { handleBounce } from "../utilities/math.js";

export class Shape {

    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    collisionDetect(balls) {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                let collider = balls[j];
                let dx = this.x - collider.x;
                let dy = this.y - collider.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < this.size + collider.size) {
                    handleBounce(this, collider);
                    return true;
                }
            }
        }
        return false;
    }
}