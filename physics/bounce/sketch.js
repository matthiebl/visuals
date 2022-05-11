
let backColour;
let blueColour;
let redColour;

function setupColours() {
    backColour = color(14, 26, 36);
    blueColour = color(61, 184, 240);
    redColour = color(243, 18, 84);
}

let ball;
let walls;

function setup() {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');

    setupColours();

    ball = new Ball(width / 2, height / 2, 50);

    walls = [];
    // walls.push(new Wall(width/2, 0, width, height));
    walls.push(new Wall(width/2, 0, width, height))
    walls.push(new Wall(0, 0, width, 0));
    walls.push(new Wall(width, height, width, 0));
    walls.push(new Wall(width, height, 0, height));
    walls.push(new Wall(0, height, 0, 0));
}

function draw() {
    background(backColour);
    
    for (let wall of walls) wall.show();

    ball.move();
    ball.show();

    // console.log(ball.distToWall(walls[0]));
}

class Ball {
    constructor(x, y, r, mass=1, col=blueColour) {
        this.pos = createVector(x, y);
        this.vel = createVector(0.1, 0.2).mult();
        this.acc = createVector(0, 0);
        this.radius = r;
        this.mass = mass;
        this.col = col;
    }

    show() {
        strokeWeight(0);
        fill(this.col);
        circle(this.pos.x, this.pos.y, this.radius * 2);

        stroke(redColour);
        strokeWeight(3);
        line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * deltaTime, this.pos.y + this.vel.y * deltaTime);
    }

    update() {
        this.pos.x = mouseX;
        this.pos.y = mouseY;
    }

    move() {
        let newVel = p5.Vector.add(this.vel, p5.Vector.mult(this.acc, deltaTime));
        let newPos = p5.Vector.add(this.pos, p5.Vector.mult(newVel, deltaTime));

        let didCollide = false;
        for (let wall of walls) {
            let intersection = lineLineIntersection(this.pos, newPos, wall.a, wall.b);
            if (intersection !== null) {
                stroke(redColour);
                strokeWeight(10);
                point(intersection.x, intersection.y);

                let distanceToWall = this.pos.dist(intersection);
                if (distanceToWall < this.radius) {
                    console.log('collision');
                }
            }
            if (this.distToWall(wall, newPos) < this.radius) {
                // Find the new velocity after the collision
                let reflectedVel = this.reflectedVelocityAfterCollision(wall, newVel);

                // Set resulting velocity to new reflected velocity
                this.vel = reflectedVel;
                
                // Find the proportion t of the velocity that is radius away from the wall
                
                // The new position is pos + newVel * t + reflectedVel * (1 - t)
                // The new velocity is reflectedVel
                
                
                // console.log(degrees(angle), degrees(newVel.heading()), degrees(reflectedVel.heading()));
                didCollide = true;
                break;
            }
        }

        if (!didCollide) {
            this.vel = newVel;
            this.pos = newPos;
        }
    }

    distToWall(wall, p=this.pos) {
        let wallVector = p5.Vector.sub(wall.b, wall.a);
        let pointOnWallToBall = p5.Vector.sub(p, wall.a);
        
        // Get the projection of the wall-ball vector on the wall vector
        let projection = p5.Vector.dot(wallVector, pointOnWallToBall) / (wallVector.mag() ** 2);
        
        // Get the distance from the wall-ball vector to the projection
        let distance = p5.Vector.sub(pointOnWallToBall, wallVector.mult(projection)).mag();
        return distance;
    }

    reflectedVelocityAfterCollision(wall, vel) {
        // Find the angle between the wall and the ball's velocity
        let angle = p5.Vector.sub(wall.b, wall.a).angleBetween(this.vel);

        // Normalise the angle to between -PI/2 and PI/2
        while (angle > Math.PI/2) angle -= Math.PI;
        while (angle < -Math.PI/2) angle += Math.PI;

        // Calculate the reflected velocity.
        let reflectedVel = vel.copy();
        if (abs(angle) === Math.PI/2) {
            reflectedVel.rotate(Math.PI);
        } else if (angle > 0) {
            let angleOfIncidence = Math.PI/2 - angle;
            reflectedVel.rotate(Math.PI + 2 * angleOfIncidence);
        } else if (angle < 0) {
            let angleOfIncidence = Math.PI/2 + angle;
            reflectedVel.rotate(Math.PI - 2 * angleOfIncidence);
        }

        return reflectedVel;
    }
}

class Wall {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    show() {
        strokeWeight(5);
        stroke(0);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}

function lineLineIntersection(v1, v2, w1, w2) {
    // Finds the point of intersection between the two line segments
    // v1-v2 and w1-w2. If no point of intersection, returns null,
    // otherwise returns the point of intersection.
    const x1 = v1.x;
    const y1 = v1.y;
    const x2 = v2.x;
    const y2 = v2.y;
    const x3 = w1.x;
    const y3 = w1.y;
    const x4 = w2.x;
    const y4 = w2.y;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom == 0) {
        return null;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

    if (t >= 0) {
        return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
    }

    return null;
}
