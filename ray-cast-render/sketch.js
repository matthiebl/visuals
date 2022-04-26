// Code adapted slightly from The Coding Train, Coding Challende #145:
// https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
// All credit goes to Daniel Shiffman.

let particle;
let walls = [];

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
}

function draw() {
    background(0);
    
    if (mouseX) {
        particle.update(mouseX, mouseY)
    } else {
        particle.update(width / 2, height / 2);
    }
    
    for (let wall of walls) {
        wall.show()
    }
    
    particle.project(walls);
}