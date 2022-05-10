
let backColour;
let blueColour;
let redColour;

function setupColours() {
    backColour = color(14, 26, 36);
    blueColour = color(61, 184, 240);
    redColour = color(243, 18, 84);
}

function setup(size=5) {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');

    setupColours();


}

function draw() {
    background(backColour);
}
