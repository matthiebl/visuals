
let backColour;
let blueColour;
let redColour;
let yellowColour;
let greenColour;

function setupColours() {
    backColour = color(14, 26, 36);
    blueColour = color(61, 184, 240);
    redColour = color(243, 18, 84);
    yellowColour = color(255, 202, 58);
    greenColour = color(138, 201, 38);
}

let t;
let last;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('visual');
    setupColours();
    windowResized();
}

function reset() {
    clear();
    let x = (height - 40) / Math.sqrt(3);
    t = [];
    t.push(createVector(width / 2, 20));
    t.push(createVector(width / 2 + x, height - 20));
    t.push(createVector(width / 2 - x, height - 20));

    last = null;

    stroke('white');
    strokeWeight(1);
    for (let p of t) point(p.x, p.y);
}

function windowResized() {
    const navbar = document.getElementById('navbar');
    const visualContainer = document.getElementById('visual');
    windowWidth = visualContainer.offsetWidth;
    windowHeight = window.innerHeight - navbar.offsetHeight;
    resizeCanvas(windowWidth, windowHeight, false);

    reset();
}

function mouseReleased() {
    if (last == null) {
        last = createVector(mouseX, mouseY);
    }
}

function draw() {
    let speed = select('#speed').value() ** 2;
    // Draw points of main shape

    if (last != null) {
        for (let i = 0; i < speed; i++) {
            let x1 = last.x;
            let y1 = last.y;
            let rand = random(t);
            let x2 = rand.x;
            let y2 = rand.y;
            last = createVector((x1 + x2) / 2, (y1 + y2) / 2);
            point(last.x, last.y)
        }
    }
}
