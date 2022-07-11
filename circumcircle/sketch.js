
let points;
let centre;

function setup() {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('visual');
    windowResized();
}

function reset() {
    let ax = random(width/10, width - width/10);
    let ay = random(height/10, height - height/10);
    let bx = random(width/10, width - width/10);
    let by = random(height/10, height - height/10);
    let cx = random(width/10, width - width/10);
    let cy = random(height/10, height - height/10);

    let D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (D === 0) {
        reset();
    }
    let X = (
        (ax * ax + ay * ay) * (by - cy) +
        (bx * bx + by * by) * (cy - ay) +
        (cx * cx + cy * cy) * (ay - by)
    ) / D;
    let Y = (
        (ax * ax + ay * ay) * (cx - bx) +
        (bx * bx + by * by) * (ax - cx) +
        (cx * cx + cy * cy) * (bx - ax)
    ) / D;
    if (X < 0 || X > width || Y < 0 || Y > height) {
        setup();
    }
    points = [];
    points.push({ x: ax, y: ay });
    points.push({ x: bx, y: by });
    points.push({ x: cx, y: cy });
    centre = { x: X, y: Y };
}

function windowResized() {
    const navbar = document.getElementById('navbar');
    const visualContainer = document.getElementById('visual');
    windowWidth = visualContainer.offsetWidth;
    windowHeight = window.innerHeight - navbar.offsetHeight;
    resizeCanvas(windowWidth, windowHeight, true);

    reset();
}

function inCircumcircle(x, y) {
    let d = dist(centre.x, centre.y, x, y);
    let r = dist(centre.x, centre.y, points[1].x, points[1].y);
    return d <= r;
}

function isCounterClockwise() {
    return (points[1].x - points[0].x)*(points[2].y - points[0].y)-(points[2].x - points[0].x)*(points[1].y - points[0].y) > 0;
}

function circumcircleContains(x, y) {
    let ax_ = points[0].x - x;
    let ay_ = points[0].y - y;
    let bx_ = points[1].x - x;
    let by_ = points[1].y - y;
    let cx_ = points[2].x - x;
    let cy_ = points[2].y - y;
    let det = (
        (ax_*ax_ + ay_*ay_) * (bx_*cy_-cx_*by_) -
        (bx_*bx_ + by_*by_) * (ax_*cy_-cx_*ay_) +
        (cx_*cx_ + cy_*cy_) * (ax_*by_-bx_*ay_)
    )
    if (isCounterClockwise()) {
        return det > 0;
    }
    return det < 0;
}

function draw() {
    clear();
    
    let a = points[0];
    let b = points[1];
    let c = points[2];
    if (dist(centre.x, centre.y, a.x, a.y) > width/2) {
        setup();
    }
    
    // Draw edges of triangle
    stroke(0);
    strokeWeight(2);
    line(a.x, a.y, b.x, b.y);
    line(b.x, b.y, c.x, c.y);
    line(c.x, c.y, a.x, a.y);
    
    // Draw circumcircle
    if (circumcircleContains(mouseX, mouseY)) {
        fill(0, 255, 0, 50);
    } else {
        fill(255, 0, 0, 50);
    }
    strokeWeight(3);
    circle(centre.x, centre.y, 2 * dist(centre.x, centre.y, a.x, a.y));
    
        if (select('#detailed').checked()) {
            stroke(255, 100);
            strokeWeight(1);
            line(centre.x, centre.y, a.x + (b.x - a.x) / 2, a.y + (b.y - a.y) / 2);
            line(centre.x, centre.y, a.x + (c.x - a.x) / 2, a.y + (c.y - a.y) / 2);
            line(centre.x, centre.y, b.x + (c.x - b.x) / 2, b.y + (c.y - b.y) / 2);
        }
    
    // Draw points
    stroke(0);
    strokeWeight(10);
    point(a.x, a.y);
    point(b.x, b.y);
    point(c.x, c.y);
    point(centre.x, centre.y);
}