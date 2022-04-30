
let points;
let centre;

function setup() {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');

    let ax = random(width/10, width - width/10);
    let ay = random(height/10, height - height/10);
    let bx = random(width/10, width - width/10);
    let by = random(height/10, height - height/10);
    let cx = random(width/10, width - width/10);
    let cy = random(height/10, height - height/10);

    let D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (D === 0) {
        setup();
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

function inCircumcircle(x, y) {
    let d = dist(centre.x, centre.y, x, y);
    let r = dist(centre.x, centre.y, points[1].x, points[1].y);
    return d <= r;
}

function draw() {
    background(51);

    // Draw edges of triangle
    stroke(0);
    strokeWeight(2);
    line(points[0].x, points[0].y, points[1].x, points[1].y);
    line(points[1].x, points[1].y, points[2].x, points[2].y);
    line(points[2].x, points[2].y, points[0].x, points[0].y);

    // Draw circumcircle
    if (inCircumcircle(mouseX, mouseY)) {
        fill(0, 255, 0, 50);
    } else {
        fill(255, 0, 0, 50);
    }
    strokeWeight(3);
    circle(centre.x, centre.y, 2 * dist(centre.x, centre.y, points[0].x, points[0].y));
}