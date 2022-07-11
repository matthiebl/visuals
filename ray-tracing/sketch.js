// Code adapted slightly from The Coding Train, Coding Challende #145:
// https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
// All credit goes to Daniel Shiffman.

let particle;
let walls;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('visual');
    windowResized();
}

function reset() {
    particle = new Particle(width / 2, height / 2);

    // Create some random walls
    walls = [];
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
    walls.push(new Wall(-1, -1, width + 1, -1));
    walls.push(new Wall(-1, -1, -1, height + 1));
    walls.push(new Wall(-1, height + 1, width + 1, height + 1));
    walls.push(new Wall(width + 1, -1, width + 1, height + 1));
}

function windowResized() {
    const navbar = document.getElementById('navbar');
    const visualContainer = document.getElementById('visual');
    windowWidth = visualContainer.offsetWidth;
    windowHeight = window.innerHeight - navbar.offsetHeight;
    resizeCanvas(windowWidth, windowHeight, false);

    reset();
}

function draw() {
    clear();
    
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