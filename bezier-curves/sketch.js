
let backColour;
let blueColour;
let redColour;

function setupColours() {
    backColour = color(14, 26, 36)
    blueColour = color(61, 184, 240)
    redColour = color(243, 18, 84)
}

let r;
let p1;
let p2;
let p3;

function setup() {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');
    
    setupColours();
    r = width / 40;
    p1 = createVector(width / 2, height / 2);
}

function showBezier() {
}

function draw() {
    background(backColour);
    
    strokeWeight(2);
    
    stroke(redColour);
    line(0, 0, width, height);

    stroke(blueColour);
    line(0, height, width, 0);
}
