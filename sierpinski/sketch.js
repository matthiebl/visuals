
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

let POINT_LIMIT = 1_000_000
let shape;
let last;

let points;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('visual');
    setupColours();
    windowResized();
}

function reset() {
    clear();

    let V = select('#verts').value();
    points = V;

    let r = min(width, height) / 2 - 40;
    let line = createVector(0, -r);

    let center;
    if (V == 3) {
        center = createVector(width / 2, height / 2 + r / 5);
    } else {
        center = createVector(width / 2, height / 2);
    }

    shape = [];
    for (let i = 0; i < V; i++) {
        shape.push(p5.Vector.add(center, line));
        line.rotate(2 * Math.PI / V);
    }

    last = null;

    stroke('white');
    strokeWeight(1);
    for (let p of shape) point(p.x, p.y);
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

    let polydist = select('#polygasket').checked();
    let d;
    if (polydist) {
        let n = shape.length;
        // Formula from https://observablehq.com/@mcmcclur/poly-gaskets
        d = 1 - Math.sin(Math.PI / n) / (Math.sin(Math.PI / n) + Math.sin(Math.PI / n + (2 * Math.PI * Math.floor(n / 4)) / n));

        let distSlider = select('#dist');
        distSlider.value(d);
        updateSlider('dist', d, 'Distance');

        document.getElementById('dist').disabled = true;
    } else {
        document.getElementById('dist').disabled = false;
        d = select('#dist').value();
    }

    if (last != null && points < POINT_LIMIT) {
        for (let i = 0; i < speed && points < POINT_LIMIT; i++) {
            let rand = random(shape);
            last = p5.Vector.lerp(last, rand, d);
            point(last.x, last.y)
            points++;
        }
        select('#points').html('Total Points: ' + points);
    }
}
