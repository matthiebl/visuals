
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
let p4;

let t;
let dir;
let is_cubic;

function setup(type=true) {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');
    
    setupColours();

    is_cubic = type;

    t = 0;
    dir = 1;
    r = 10;
    p1 = new Point(width / 2 - width / 4, height / 2 + height / 6);
    p2 = new Point(width / 2 - width / 5, height / 2 - height / 6);
    p3 = new Point(width / 2 + width / 5, height / 2 - height / 6);
    p4 = new Point(width / 2 + width / 4, height / 2 + height / 6);
}

function draw() {
    let rawSpeed = select('#speed').value();
    let speed = map(rawSpeed, 0, 100, 0.001, 0.01);
    if (rawSpeed == 0) {
        speed = 0;
    }

    background(backColour);

    p1.update();
    p2.update();
    p3.update();
    p4.update();
    
    showPivotLines();
    showLerpQuad();
    if (is_cubic) showLerpCubic();

    showBezier();
    
    t += speed * dir;
    if (t > 1) {
        dir = -1;
    }
    if (t < 0) {
        dir = 1;
    }
}

function mousePressed() {
    if (dist(mouseX, mouseY, p1.x, p1.y) < r) {
        p1.drag = true;
    }
    if (dist(mouseX, mouseY, p2.x, p2.y) < r) {
        p2.drag = true;
    }
    if (dist(mouseX, mouseY, p3.x, p3.y) < r) {
        p3.drag = true;
    }
    if (dist(mouseX, mouseY, p4.x, p4.y) < r) {
        p4.drag = true;
    }
}

function mouseReleased() {
    p1.drag = false;
    p2.drag = false;
    p3.drag = false;
    p4.drag = false;
}

function showBezier() {
    for (let u = 0; u < t; u += 0.001) {
        stroke(255);
        fill(backColour);
        strokeWeight(5);

        let bezPoint;
        if (is_cubic) bezPoint = getCubicPoint(p1, p2, p3, p4, u);
        else bezPoint = getQuadPoint(p1, p2, p3, u);
        point(bezPoint.x, bezPoint.y);
    }
    
    // Draw white dots
    fill(backColour);
    stroke(255);
    strokeWeight(3);
    circle(p1.x, p1.y, 2 * r);
    if (is_cubic) circle(p4.x, p4.y, 2 * r);
    else circle(p3.x, p3.y, 2 * r);

    let bezPoint;
    if (is_cubic) bezPoint = getCubicPoint(p1, p2, p3, p4, t);
    else bezPoint = getQuadPoint(p1, p2, p3, t);
    circle(bezPoint.x, bezPoint.y, 2 * r);
}

function showPivotLines() {
    // Draw white lines
    fill(backColour);
    stroke(255, 150);
    strokeWeight(1);
    line(p1.x, p1.y, p2.x, p2.y);
    line(p2.x, p2.y, p3.x, p3.y);
    if (is_cubic) line(p3.x, p3.y, p4.x, p4.y);
    
    // Draw white dots
    stroke(255);
    strokeWeight(3);
    circle(p1.x, p1.y, 2 * r);
    circle(p2.x, p2.y, 2 * r);
    circle(p3.x, p3.y, 2 * r);
    if (is_cubic) circle(p4.x, p4.y, 2 * r);
}

function showLerpQuad() {
    let A = getLinearPoint(p1, p2, t);
    let B = getLinearPoint(p2, p3, t);
    let C = getLinearPoint(p3, p4, t);

    // Draw blue lines
    fill(backColour);
    stroke(blueColour);
    strokeWeight(1);

    line(A.x, A.y, B.x, B.y);
    if (is_cubic) line(B.x, B.y, C.x, C.y);

    // Draw blue dots
    strokeWeight(3);
    circle(A.x, A.y, 2 * r);
    circle(B.x, B.y, 2 * r);
    if (is_cubic) circle(C.x, C.y, 2 * r);
}

function showLerpCubic() {
    // Draw red lines
    fill(backColour);
    stroke(redColour);
    strokeWeight(1);
    let D = getQuadPoint(p1, p2, p3, t);
    let E = getQuadPoint(p2, p3, p4, t);
    line(D.x, D.y, E.x, E.y);

    // Draw red dots
    strokeWeight(3);
    circle(D.x, D.y, 2 * r);
    circle(E.x, E.y, 2 * r);
}

function getLinearPoint(p0, p1, t) {
    return createVector(lerp(p0.x, p1.x, t), lerp(p0.y, p1.y, t));
}

function getQuadPoint(p0, p1, p2, t) {
    let A = getLinearPoint(p0, p1, t);
    let B = getLinearPoint(p1, p2, t);

    return createVector(lerp(A.x, B.x, t), lerp(A.y, B.y, t));
}

function getCubicPoint(p0, p1, p2, p3, t) {
    let D = getQuadPoint(p0, p1, p2, t);
    let E = getQuadPoint(p1, p2, p3, t);

    return createVector(lerp(D.x, E.x, t), lerp(D.y, E.y, t));
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.drag = false;
    }

    update() {
        if (this.drag) {
            this.x = mouseX;
            this.y = mouseY;
        }
    }
}
