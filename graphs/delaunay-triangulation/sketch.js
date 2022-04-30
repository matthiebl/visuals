
let nV;
let points;
let r;

let tri;
let superTriangle;
let i;

function setup(nv=4) {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');

    nV = nv;
    r = width / 30 * 3 / (nV ** 0.35);
    
    points = [];
    for (let i = 0; i < nV; i++) {
        let x = random(r + 5, width - (r + 5));
        let y = random(r + 5, height - (r + 5));
        while (points.some(p => dist(p.x, p.y, x, y) < 2 * r)) {
            x = random(r + 5, width - (r + 5));
            y = random(r + 5, height - (r + 5));
        }

        points.push(new Point(x, y));
    }

    // tri = BowyerWatson(points);
    i = 0;
    tri = [];
    superTriangle = new Triangle(new Point(width/2, -height), new Point(2*width, height), new Point(-width, height));
    tri.push(superTriangle);
}

function step() {
    if (i >= nV) {
        return;
    }
    console.log("Working on point", i, points[i]);
    let point = points[i]; 
    let badTriangles = [];
    for (let triangle of tri) { // first find all the triangles that are no longer valid due to the insertion
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
        tri.push(newTri);
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
    for (let triangle of triangulation) {// done inserting points, now clean up
        if (triangle.sharesPoint(superTriangle)) {
            triangulation.splice(triangulation.indexOf(triangle), 1);
        }
    }
    return triangulation
}

function draw() {
    background(0);
    let rawSpeed = select('#speed').value();
    if (rawSpeed === 0) {
        frameRate(60);
    } else {
        let solveSpeed = map(rawSpeed, 0, 100, 0.5, 2.5) ** 3;
        frameRate(solveSpeed);
        step();
    }
    console.log(i - 1, nV);
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
    for (let { x, y } of points) {
        strokeWeight(r);
        point(x, y);
    }

    for (let triangle of tri) {
        for (let edge of triangle.edges) {
            strokeWeight(1);
            line(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
        }
    }
}
