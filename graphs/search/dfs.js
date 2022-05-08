
var dfs = function(p) {

    p.setup = function(nV=50, seed=0) {
        var cnv1 = p.createCanvas(0.375 * p.windowWidth, p.windowHeight);
        cnv1.parent('dfs-sketch');
        
        p.background(14, 26, 36);
        p.g = new Graph(nV);
        
        // Create some dummy vertices
        p.r = p.width / 30 * 3 / (nV ** 0.35);
        p.points = [];
        p.randomSeed(seed);
        for (let i = 0; i < nV; i++) {
            let x = p.random(p.r + 5, p.width - (p.r + 5));
            let y = p.random(p.r + 5, p.height - (p.r + 5));
            while (p.points.some(v => p.dist(v.x, v.y, x, y) < 2 * p.r)) {
                x = p.random(p.r + 5, p.width - (p.r + 5));
                y = p.random(p.r + 5, p.height - (p.r + 5));
            }
            
            p.points.push(new Point(x, y));
        }
        p.colour = [];
        p.pred = [];
        for (let i = 0; i < nV; i++) {
            p.colour.push(255);
            p.pred.push(null);
        }
        
        if (p.select('#tree').checked()) {
            for (let i = 0; i < nV; i++) {
                for (let j = i + 1; j < nV; j++) {
                    p.g.addEdge(i, j, p.dist(p.points[i].x, p.points[i].y, p.points[j].x, p.points[j].y));
                }
            }
            p.g = p.g.mst(p.g);
        } else {
            p.g = p.g.planarGraph(p.points);
        }
        p.edges = p.g.getAllEdges();

        p.currV = p.floor(p.random(0, nV));
        p.startV = p.currV;
        p.V = new Set();
        p.S = [p.currV];
        p.searchEdges = new Set();
    }

    p.step = function() {
        if (p.S.length === 0) {
            p.currV = null;
            return;
        }
        
        let v = p.S.pop();
        
        if (p.pred[v] !== null) {
            p.colour[v] = p.colour[p.pred[v]] - 600 / p.g.getNumVertices();
        }
        
        p.V.add(v);
        for (let w of p.g.getNeighbours(v)) {
            if (!p.V.has(w) && !p.S.includes(w)) {
                p.S.push(w);
                p.searchEdges.add([v, w]);
                p.pred[w] = v;
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

        p.background(14, 26, 36);
        
        p.noFill();
        p.stroke(255);
        p.strokeWeight(10);
        p.rect(0, 0, p.width, p.height);

        // Draw the edges of the graph
        p.stroke(255, 150);
        p.strokeWeight(1);
        for (let [v, w] of p.edges) {
            p.line(p.points[v].x, p.points[v].y, p.points[w].x, p.points[w].y);
        }

        // Draw the edges that have been searched
        p.stroke(61, 184, 240);
        p.strokeWeight(p.min(6, p.r / 2.5));
        for (let [v, w] of p.searchEdges) {
            p.line(p.points[v].x, p.points[v].y, p.points[w].x, p.points[w].y);
        }
        
        p.stroke(150);
        p.strokeWeight(1);
        // Draw the points of the graph.
        for (let i = 0; i < p.points.length; i++) {
            if (p.colour[i] === 255) {
                p.fill(255);
            } else {
                p.fill(255, p.colour[i], 0);
            }
            let { x, y } = p.points[i];
            p.circle(x, y, p.r * 1.5);
        }

        // Draw the start vertex
        p.fill(0, 255, 0);
        p.circle(p.points[p.startV].x, p.points[p.startV].y, p.r * 2);

        // Draw the current vertex.
        if (p.currV !== null) {
            p.fill(255, 0, 100);
            p.circle(p.points[p.currV].x, p.points[p.currV].y, p.r * 1.5 + 1);
            p.strokeWeight(0);
            p.fill(255, 0, 100, 50);
            p.circle(p.points[p.currV].x, p.points[p.currV].y, p.r * 3);
        }
    }

}

var dfsSketch = new p5(dfs);
