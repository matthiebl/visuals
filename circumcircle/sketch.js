
let circle;

function setup() {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');

    points = [];
    let a = createVector(random(width/10, width-width/10), random(height/10, height-height/10));
    let b = createVector(random(width/10, width-width/10), random(height/10, height-height/10));
    let c = createVector(random(width/10, width-width/10), random(height/10, height-height/10));
    
    background(0);
    
    stroke(255);
    strokeWeight(width / 30);
    point(a.x, a.y);
    point(b.x, b.y);
    point(c.x, c.y);
    strokeWeight(0);
    text("a", a.x, a.y);
    text("b", b.x, b.y);
    text("c", c.x, c.y);
    
    let unit = createVector(0, 0, 1);
    let ab = p5.Vector.sub(b, a);
    let ac = p5.Vector.sub(c, a);
    let bc = p5.Vector.sub(c, b);
    let abp = p5.Vector.cross(ab, unit).normalize();
    let acp = p5.Vector.cross(ac, unit).normalize();
    let bcp = p5.Vector.cross(bc, unit).normalize();
    strokeWeight(1);
    line(a.x, a.y, a.x + ab.x, a.y + ab.y);
    line(a.x + ab.x/2, a.y + ab.y/2, a.x + ab.x/2 + 10000*abp.x, a.y + ab.y/2 + 10000*abp.y);
    line(a.x + ab.x/2, a.y + ab.y/2, a.x + ab.x/2 - 10000*abp.x, a.y + ab.y/2 - 10000*abp.y);
    line(a.x, a.y, a.x + ac.x, a.y + ac.y);
    line(a.x + ac.x/2, a.y + ac.y/2, a.x + ac.x/2 + 10000*acp.x, a.y + ac.y/2 + 10000*acp.y);
    line(a.x + ac.x/2, a.y + ac.y/2, a.x + ac.x/2 - 10000*acp.x, a.y + ac.y/2 - 10000*acp.y);
    line(b.x, b.y, b.x + bc.x, b.y + bc.y);
    line(b.x + bc.x/2, b.y + bc.y/2, b.x + bc.x/2 + 10000*bcp.x, b.y + bc.y/2 + 10000*bcp.y);
    line(b.x + bc.x/2, b.y + bc.y/2, b.x + bc.x/2 - 10000*bcp.x, b.y + bc.y/2 - 10000*bcp.y);

    let x1 = a.x + ab.x/2;
    let y1 = a.y + ab.y/2;
    let x2 = x1 + 50*abp.x;
    let y2 = y1 + 50*abp.y;
    let x3 = a.x + ac.x/2;
    let y3 = a.y + ac.y/2;
    let x4 = x3 + 50*acp.x;
    let y4 = y3 + 50*acp.y;
    
    let D = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
    if (D == 0) {
        setup();
    }
    let px = ((x1*y2 - y1*x2)*(x3 - x4) - (x1 - x2)*(x3*y4 - y3*x4)) / D;
    let py = ((x1*y2 - y1*x2)*(y3 - y4) - (y1 - y2)*(x3*y4 - y3*x4)) / D;

    if (px < 0 || px > width || py < 0 || py > height) {
        setup();
    }
    stroke(255);
    strokeWeight(20);
    point(px, py);
}

function draw() {
}