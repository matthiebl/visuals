
let nV;
let points;
let r;

let tri;
let badTriangles;
let superTriangle;
let i;

function setup(nv=30) {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');

    background(0);
    frameRate(60);

    nV = nv;
    r = width / 75;
    
    tri = [];
    badTriangles = [];
    superTriangle = new Triangle(new Point(width/2, -height), new Point(2*width, height), new Point(-width, height));
    tri.push(superTriangle);
    i = 0;

    points = [];
    for (let i = 0; i < nV; i++) {
        let x = random(r + 5, width - (r + 5));
        let y = random(r + 5, height - (r + 5));
        let safeguard = 0;
        while ((select('#round').checked() && dist(width/2, height/2, x, y) > min(width, height)/2) || points.some(p => dist(p.x, p.y, x, y) < 2 * r)) {
            x = random(r + 5, width - (r + 5));
            y = random(r + 5, height - (r + 5));
            safeguard++;
            if (safeguard > 100) {
                break;
            }
        }
        if (!((select('#round').checked() && dist(width/2, height/2, x, y) > min(width, height)/2) || points.some(p => dist(p.x, p.y, x, y) < 2 * r))) {
            points.push(new Point(x, y));
        }
    }
}

function once(arr, fn) {
    return arr.filter(fn).length === 1;
}

function step() {
    if (i >= nV) {
        return;
    }
    let point = points[i];
    badTriangles = [];
    for (let triangle of tri) { // first find all the triangles that are no longer valid due to the insertion
        if (i !== 0 && triangle.equals(superTriangle)) {
            continue;
        }
        if (triangle.circumcircleContains(point)) {
            console.log()
            badTriangles.push(triangle);
        }
    }        
    let polygon = [];
    for (let triangle of badTriangles) { // find the boundary of the polygonal hole
        for (let edge of triangle.edges) {
            if (once(badTriangles, t => t.containsEdge(edge))) {
                polygon.push(edge);
            }
        }
    }
    for (let triangle of badTriangles) {
        tri.splice(tri.indexOf(triangle), 1);
    }
    for (let edge of polygon) {// re-triangulate the polygonal hole
        tri.push(new Triangle(new Point(edge.a.x, edge.a.y), new Point(edge.b.x, edge.b.y), new Point(point.x, point.y)));
    }
    i++;
}

function BowyerWatson() {
    // pointList is a set of coordinates defining the points to be triangulated
    for (let point of points) {
        let bads = [];
        for (let triangle of tri) { // first find all the triangles that are no longer valid due to the insertion
            if (i !== 0 && triangle.equals(superTriangle)) {
                continue;
            }
            if (triangle.circumcircleContains(point)) {
                console.log()
                bads.push(triangle);
            }
        }        
        let polygon = [];
        for (let triangle of bads) { // find the boundary of the polygonal hole
            for (let edge of triangle.edges) {
                if (once(bads, t => t.containsEdge(edge))) {
                    polygon.push(edge);
                }
            }
        }
        for (let triangle of bads) {
            tri.splice(tri.indexOf(triangle), 1);
        }
        for (let edge of polygon) {// re-triangulate the polygonal hole
            tri.push(new Triangle(new Point(edge.a.x, edge.a.y), new Point(edge.b.x, edge.b.y), new Point(point.x, point.y)));
        }
    }
    triCopy = tri.slice();
    for (let triangle of triCopy) {// done inserting points, now clean up
        if (triangle.sharesPoint(superTriangle)) {
            tri.splice(tri.indexOf(triangle), 1);
        }
    }
}

function draw() {
    let drawCurrs = false;
    let rawSpeed = select('#speed').value();
    if (rawSpeed === 0) {
        frameRate(60);
    } else if (rawSpeed === 100) {
        badTriangles = [];
        frameRate(60);
        BowyerWatson();
        i = nV;
    } else {
        let solveSpeed = map(rawSpeed, 0, 100, 0.8, 4) ** 3;
        frameRate(solveSpeed);
        step();
    }
    if (i >= nV) {
        badTriangles = [];
        triCopy = tri.slice();
        for (let triangle of triCopy) {
            if (triangle.sharesPoint(superTriangle)) {
                tri.splice(tri.indexOf(triangle), 1);
            }
        }
    } else {
        drawCurrs = true;
    }
    
    background(0);

    // Draw the edges of the graph.
    stroke(255);
    for (let triangle of tri) {
        if (triangle.sharesPoint(superTriangle)) {
            continue;
        }
        for (let edge of triangle.edges) {
            strokeWeight(1);
            line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
        }
    }

    // Draw the triangles being removed.
    if (select('#detailed').checked()) {
        stroke(255, 0, 0);
        for (let triangle of badTriangles) {
            for (let edge of triangle.edges) {
                strokeWeight(1);
                line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
            }
        }
    }

    // Draw the points of the graph.
    for (let j = 0; j < (select('#allPoints').checked() ? nV : i); j++) {
        let { x, y } = points[j];
        stroke(255);
        strokeWeight(r);
        point(x, y);
    }
    
    // Draw current points.
    if (drawCurrs) {
        strokeWeight(r);
        if (i - 1 >= 0 && i - 1 < nV) {
            stroke(255, 0, 0);
            point(points[i-1].x, points[i-1].y);
        }
        if (i < nV) {
            stroke(255, 0, 100);
            point(points[i].x, points[i].y);
        }
    }
}
