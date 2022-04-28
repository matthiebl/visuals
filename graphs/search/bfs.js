
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
                c: 255,
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
        p.startV = p.currV;
        p.V = new Set();
        p.Q = [p.currV];
        p.searchEdges = new Set();
    }

    p.step = function() {
        if (p.Q.length === 0) {
            p.currV = null;
            return;
        }
        let v = p.Q.shift();
        p.V.add(v);
        for (let w of p.g.getNeighbours(v)) {
            if (!p.V.has(w) && !p.Q.includes(w)) {
                p.Q.push(w);
                p.vertices[w].c = p.vertices[v].c - 600 / p.g.getNumVertices();
                p.searchEdges.add([v, w]);
            }
        }
        p.currV = v;
    }

    p.draw = function() {
        let rawSpeed = p.select('#speed').value();
        if (rawSpeed === 0) {
            p.frameRate(60);
        } else {
            let solveSpeed = p.map(rawSpeed, 0, 100, 0.5, 2.5) ** 3;
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

        // Draw the edges that have been searched
        p.stroke(0, 0, 255);
        p.strokeWeight(p.min(6, p.vertices[0].r / 2.5));
        for (let [v, w] of p.searchEdges) {
            p.line(p.vertices[v].x, p.vertices[v].y, p.vertices[w].x, p.vertices[w].y);
        }
        
        p.stroke(150);
        p.strokeWeight(1);
        // Draw the vertices of the graph.
        for (let { x, y, r, c } of p.vertices) {
            if (c === 255) {
                p.fill(c);
            } else {
                p.fill(0, c, 0);
            }
            p.circle(x, y, r * 1.5);
        }

        // Draw the start vertex
        p.fill(255, 0, 0);
        p.circle(p.vertices[p.startV].x, p.vertices[p.startV].y, p.vertices[p.startV].r * 2);

        // Draw the current vertex.
        if (p.currV !== null) {
            p.fill(255, 0, 100);
            p.circle(p.vertices[p.currV].x, p.vertices[p.currV].y, p.vertices[p.currV].r * 1.5 + 1);
            p.strokeWeight(0);
            p.fill(255, 0, 100, 50);
            p.circle(p.vertices[p.currV].x, p.vertices[p.currV].y, p.vertices[p.currV].r * 3);
        }
    }

}

var bfsSketch = new p5(bfs);
