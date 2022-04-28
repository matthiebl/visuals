
var bfs = function(p) {

    p.setup = function(nV=50, seed=0) {
        var cnv1 = p.createCanvas(0.375 * p.windowWidth, p.windowHeight);
        cnv1.parent('bfs-sketch');
        
        p.g = new Graph(nV);
        
        // Create some dummy vertices
        let r = p.width / 30 * 3 / (nV ** 0.35);
        p.vertices = [];
        p.randomSeed(seed);
        for (let i = 0; i < nV; i++) {
            let x = p.random(r + 5, p.width - (r + 5));
            let y = p.random(r + 5, p.height - (r + 5));
            while (p.vertices.some(v => p.dist(v.x, v.y, x, y) < 2 * r)) {
                x = p.random(r + 5, p.width - (r + 5));
                y = p.random(r + 5, p.height - (r + 5));
            }
            
            p.vertices.push({
                x: x,
                y: y,
                r: r,
            });
        }
        
        for (let i = 0; i < nV; i++) {
            for (let j = i + 1; j < nV; j++) {
                p.g.addEdge(i, j, p.dist(p.vertices[i].x, p.vertices[i].y, p.vertices[j].x, p.vertices[j].y));
            }
        }
        p.g = p.g.mstPrims(p.g);
        p.edges = p.g.getAllEdges();

        p.currV = p.floor(p.random(0, nV));
        p.Q = [];
    }

    p.step = function() {

    }

    p.draw = function() {
        let rawSpeed = p.select('#speed').value();
        if (rawSpeed === 0) {
            p.frameRate(60);
        } else {
            let solveSpeed = p.map(rawSpeed, 0, 100, 0.75, 4) ** 3;
            p.frameRate(solveSpeed);
            p.step();
        }

        p.background(0);
        
        p.noFill();
        p.stroke(255);
        p.strokeWeight(10);
        p.rect(0, 0, p.width, p.height);

        // Draw the edges of the graph
        p.stroke(255, 150);
        p.strokeWeight(1);
        for (let [v, w] of p.edges) {
            p.line(p.vertices[v].x, p.vertices[v].y, p.vertices[w].x, p.vertices[w].y);
        }
        
        // Draw the vertices of the graph.
        for (let { x, y, r } of p.vertices) {
            p.stroke(255);
            p.strokeWeight(r);
            p.point(x, y);
        }

        // Draw the current vertex.
        p.stroke(255, 0, 100);
        p.strokeWeight(p.vertices[p.currV].r);
        p.point(p.vertices[p.currV].x, p.vertices[p.currV].y);

    }

}

var bfsSketch = new p5(bfs);
