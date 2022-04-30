
let nV;
let points;
let r;

let tri;
let badTriangles;
let superTriangle;
let i;

function setup(nv=4) {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');

    nV = nv;
    r = width / 75;
    
    i = 0;
    tri = [];
    superTriangle = new Triangle(new Point(width/2, -height), new Point(2*width, height), new Point(-width, height));
    tri.push(superTriangle);
    points = [];
    for (let i = 0; i < nV; i++) {
        let x = random(r + 5, width - (r + 5));
        let y = random(r + 5, height - (r + 5));
        while (dist(width/2, height/2, x, y) > min(width, height)/2 || points.some(p => dist(p.x, p.y, x, y) < 2 * r)) {
            x = random(r + 5, width - (r + 5));
            y = random(r + 5, height - (r + 5));
        }

        points.push(new Point(x, y));
    }

}

function once(arr, fn) {
    return arr.filter(fn).length === 1;
}

function step() {
    if (i >= nV) {
        return;
    }
    console.log("Working on point", i, points[i]);
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

function BowyerWatson(pointList) {
    // pointList is a set of coordinates defining the points to be triangulated
    let triangulation = [];
    let superTriangle = new Triangle(new Point(width/2, -height), new Point(2*width, height), new Point(-width, height));
    triangulation.push(superTriangle);
    for (let point of pointList) { // add all the points one at a time to the triangulation
        let badTriangles = [];
        for (let triangle of triangulation) { // first find all the triangles that are no longer valid due to the insertion
            if (triangle.circumcircleContains(point)) {
                badTriangles.push(triangle);
            }
        }        
        let polygon = [];
        for (let triangle of badTriangles) { // find the boundary of the polygonal hole
            for (let edge of triangle.edges) {
                if (!badTriangles.some(t => t != triangle && t.sharesEdge(edge))) {
                    polygon.push(edge);
                }
            }
        }
        for (let edge of polygon) {// re-triangulate the polygonal hole
            newTri = new Triangle(edge.a, edge.b, point);
            triangulation.push(newTri);
        }
    }
    let triCopy = triangulation.slice();
    for (let triangle of triCopy) {// done inserting points, now clean up
        if (triangle.sharesPoint(superTriangle)) {
            triangulation.splice(triangulation.indexOf(triangle), 1);
        }
    }
    return triangulation
}

function draw() {
    background(0);
    badTriangles = [];
    let rawSpeed = select('#speed').value();
    if (rawSpeed === 0) {
        frameRate(60);
    } else {
        let solveSpeed = map(rawSpeed, 0, 100, 7, 2.5) ** 4;
        frameRate(solveSpeed);
        step();
    }
    if (i === nV) {
        console.log("Removing super triangle");
        triCopy = tri.slice();
        for (let triangle of tri) {// done inserting points, now clean up
            if (triangle.sharesPoint(superTriangle)) {
                triCopy.splice(triCopy.indexOf(triangle), 1);
            }
        }
        tri = triCopy;
        i++;
    }

    stroke(255);
    for (let triangle of tri) {
        for (let edge of triangle.edges) {
            strokeWeight(1);
            line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
        }
    }
    // console.log(badTriangles);
    stroke('red');
    for (let triangle of badTriangles) {
        for (let edge of triangle.edges) {
            strokeWeight(1);
            line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
        }
    }

    for (let { x, y } of points) {
        stroke(255);
        strokeWeight(r);
        point(x, y);
    }
}
