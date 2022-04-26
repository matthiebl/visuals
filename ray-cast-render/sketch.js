// Code adapted slightly from The Coding Train, Coding Challende #145:
// https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
// All credit goes to Daniel Shiffman.

// The small camera rendering has completely been written by myself.
// The idea was inspired by the above.

let particle;
let walls = [];
let camWidth;
let camHeight;

function setup() {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch-holder');

    particle = new Particle(width / 2, height / 2);

    // Create some random walls
    const xbuff = 0.05 * width;
    const ybuff = 0.05 * height;
    for (let i = 0; i < 5; i++) {
        const x1 = random(xbuff, width - xbuff);
        const y1 = random(ybuff, height - ybuff);
        const x2 = random(xbuff, width - xbuff);
        const y2 = random(ybuff, height - ybuff);
        walls.push(new Wall(x1, y1, x2, y2));
    }
    // Create walls around the edge of scene
    walls.push(new Wall(0, 0, width, 0));
    walls.push(new Wall(0, 0, 0, height));
    walls.push(new Wall(0, height, width, height));
    walls.push(new Wall(width, 0, width, height));

    camWidth = width / 4;
    camHeight = height / 4;
}

let l = 0;
let r = 0;
let u = 0;
let d = 0;
let speed;

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        l = -1;
    }
    if (keyCode === RIGHT_ARROW) {
        r = 1;
    }
    if (keyCode === UP_ARROW) {
        u = -1;
    }
    if (keyCode === DOWN_ARROW) {
        d = 1;
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        l = 0;
    }
    if (keyCode === RIGHT_ARROW) {
        r = 0;
    }
    if (keyCode === UP_ARROW) {
        u = 0;
    }
    if (keyCode === DOWN_ARROW) {
        d = 0;
    }
}

function draw() {
    speed = map(select('#speed').value(), 0, 10, 1, 5);
    background(0);
    
    particle.lookAt(mouseX, mouseY);
    particle.update(particle.pos.x + speed * (l + r), particle.pos.y + speed * (u + d));
    
    for (let wall of walls) {
        wall.show()
    }
    
    particle.project(walls);

    stroke(255);
    fill(0);
    rect(10, 10, camWidth + 1, camHeight);
    let dists = particle.getDists();
    for (let i = 0; i < dists.length; i++) {
        strokeWeight(0);
        fill(255 - map(dists[i], 0, 1000, 155, 255));
        const boxHeight = camHeight - map(dists[i], 0, 1000, 0, camHeight);
        rect(
            10 + i * camWidth / dists.length,
            10 + (camHeight - boxHeight) / 2,
            camWidth / dists.length + 1,
            boxHeight
        );
    }
}