export function handleBounce(ball1, ball2) {

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

    ball1.velX = Math.cos(collAngle) * finalVelX1 + Math.cos(collAngle + Math.PI / 2) * finalVelY1;
    ball1.velY = Math.sin(collAngle) * finalVelX1 + Math.sin(collAngle + Math.PI / 2) * finalVelY1;
    ball2.velX = Math.cos(collAngle) * finalVelX2 + Math.cos(collAngle + Math.PI / 2) * finalVelY2;
    ball2.velY = Math.sin(collAngle) * finalVelX2 + Math.sin(collAngle + Math.PI / 2) * finalVelY2;

    ball1.x = ball1.x + ball1.velX;
    ball1.y = ball1.y + ball1.velY;
    ball2.x = ball2.x + ball2.velX;
    ball2.y = ball2.y + ball2.velY;

}

export function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}