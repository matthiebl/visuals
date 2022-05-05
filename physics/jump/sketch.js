
let backColour;
let blueColour;
let redColour;

function setupColours() {
    backColour = color(14, 26, 36)
    blueColour = color(61, 184, 240)
    redColour = color(243, 18, 84)
}

let play;
let score;

let floorA;
let floorB;
let cube;

function setup(type=true) {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');
    
    setupColours();
    
    play = true;
    score = 0;

    floorA = new Floor(width/8, 2*height/3, 1*width/4, 20, color(255));
    floorB = new Floor(5*width/8, height/6, 1*width/4, 20, color(255));
    cube = new Cube(3*width/4, 20, 50, 50, redColour);
}

function keyPressed() {
    if (key === ' ' || key === 'w' || key === 'W' || keyCode === UP_ARROW) {
        cube.jump();
        if (!play) {
            setup();
        }
    }
}

function draw() {
    background(backColour);
    
    fill(255);
    stroke(45);
    strokeWeight(2);
    textSize(35);
    textFont("Arial");
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);

    let dx = 0;
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        dx -= 30;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        dx += 30;
    }
    cube.move(dx, 0);

    floorA.show();
    floorB.show();
    cube.show();
    
    if (play) {
        floorA.update();
        floorB.update();
        cube.update();
    } else {
        fill(255);
        stroke(45);
        strokeWeight(5);
        textSize(100);
        textFont("Arial");
        textAlign(CENTER, CENTER);
        text("GAME OVER", width/2, height/2);
    }
}

function gameOver() {
    play = false;
}

function increaseScore() {
    score++;
}

class PhysObj {
    constructor(shape, x, y, w, h, colour) {
        this.shape = shape;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.colour = colour;

        this.xa = 0;
        this.ya = 9.8;
        this.xv = 0;
        this.yv = 0;
    }

    show() {
        fill(this.colour);
        strokeWeight(0);
        this.shape(this.x, this.y, this.w, this.h);
    }

    update() {
        this.x += this.xv * (deltaTime / 100);
        this.y += this.yv * (deltaTime / 100);

        this.xv += this.xa * (deltaTime / 100);
        this.yv += this.ya * (deltaTime / 100);
    }

    collidingWith(other) {
        return (this.x <= other.x + other.w &&
                this.x + this.w >= other.x &&
                this.y <= other.y + other.h &&
                this.y + this.h >= other.y);
    }
}

class Floor extends PhysObj {
    constructor(x, y, w, h, colour) {
        super(rect, x, y, w, h, colour);

        this.ya = 0;
        this.yv = 20;
    }

    update() {
        super.update();
        if (this.y > height) {
            this.y = 0;
        }
    }
}

class Cube extends PhysObj {
    constructor(x, y, w, h, colour) {
        super(rect, x, y, w, h, colour);
    }

    update() {
        super.update();
        if (this.y > height) {
            gameOver();
        }
        if (this.collidingWith(floorA)) {
            this.y = floorA.y - this.h;
            this.yv -= this.ya * (deltaTime / 100);
        }
        if (this.collidingWith(floorB)) {
            this.y = floorB.y - this.h;
            this.yv -= this.ya * (deltaTime / 100);
        }
        if (this.x > width) {
            this.x = 0;
        }
        if (this.x < 0) {
            this.x = width - this.w;
        }
    }

    jump() {
        if (this.collidingWith(floorA) || this.collidingWith(floorB)) {
            this.yv = -100;
            increaseScore();
        }
    }

    move(dx, dy) {
        this.x += dx * (deltaTime / 100);
        this.y += dy * (deltaTime / 100);
    }
}