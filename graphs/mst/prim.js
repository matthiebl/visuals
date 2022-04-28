
var prim = function(p) {

    p.setup = function(nV=50, seed=0) {
        var cnv1 = p.createCanvas(0.375 * p.windowWidth, p.windowHeight);
        cnv1.parent('prim-sketch');

        p.g = new Graph(nV);
        
        // Create some dummy vertices
        let r = p.width / 30 * 3 / (nV ** 0.35);
        p.vertices = [];
        p.randomSeed(seed);
        for (let i = 0; i < p.g.getNumVertices(); i++) {
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
        
        p.allEdges = [];
        for (let i = 0; i < p.g.getNumVertices(); i++) {
            for (let j = i + 1; j < p.g.getNumVertices(); j++) {
                p.g.addEdge(i, j, p.dist(p.vertices[i].x, p.vertices[i].y, p.vertices[j].x, p.vertices[j].y));
                p.allEdges.push([i, j]);
            }
        }

        p.C = [];
        p.E = [];
        p.Q = [];
        for (let v = 0; v < p.g.getNumVertices(); v++) {
            p.C[v] = Infinity;
            p.E[v] = -1;
            p.Q.push(v)
        }
        
        p.currV = null;
        p.F = [];
        p.mst = [];
    }

    p.primStep = function() {
        if (p.Q.length === 0) {
            p.currV = null;
            return;
        }

        // Find min cost edge in Q and remove it
        let v = p.Q[0];
        for (let i = 0; i < p.Q.length; i++) {
            if (p.C[p.Q[i]] < p.C[v]) {
                v = p.Q[i];
            }
        }
        p.Q.splice(p.Q.indexOf(v), 1);
        p.currV = v;
        
        // Add v to F
        p.F.push(v);
        if (p.E[v] !== -1) {
            // Add E[v] to F
            p.F.push(p.E[v]);
        }
        
        // Find neighbours of v
        let neighbours = p.g.getNeighbours(v);
        for (let w of neighbours) {
            if (p.Q.includes(w)) {
                // Update C[w]
                if (p.g.getEdge(v, w) < p.C[w]) {
                    p.C[w] = p.g.getEdge(v, w);
                    p.E[w] = v;
                }
            } else {
                p.allEdges.splice(p.allEdges.indexOf([v, w]), 1);
            }
        }
        if (p.E[v] !== -1) {
            p.mst.push([v, p.E[v]])
        }
    }

    p.draw = function() {
        let rawSpeed = p.select('#speed').value();
        if (rawSpeed === 0) {
            p.frameRate(60);
        } else {
            let solveSpeed = p.map(rawSpeed, 0, 100, 0.75, 4) ** 3;
            p.frameRate(solveSpeed);
            p.primStep();
        }

        p.background(0);
        
        p.noFill();
        p.stroke(255);
        p.strokeWeight(10);
        p.rect(0, 0, p.width, p.height);
        
        // Edges to consider for MST
        for (let w = 0; w < p.E.length; w++) {
            let v = p.E[w];
            if (v !== -1) {
                p.stroke(0, 100, 255, 150);
                p.strokeWeight(2);
                p.line(p.vertices[v].x, p.vertices[v].y, p.vertices[w].x, p.vertices[w].y);
            }
        }
        // Edges in MST
        for (let [v, w] of p.mst) {
            p.stroke(0, 0, 255);
            // p.strokeWeight(5);
            p.strokeWeight(p.min(6, p.vertices[v].r / 2.5));
            p.line(p.vertices[v].x, p.vertices[v].y, p.vertices[w].x, p.vertices[w].y);
        }
            
        // Draw the vertices of the graph
        for (let v of p.Q) {
            p.stroke(255);
            p.strokeWeight(p.vertices[v].r);
            p.point(p.vertices[v].x, p.vertices[v].y);
        }

        // Draw the vertices of the MST
        for (let v of p.F) {
            p.stroke(0, 255, 0);
            p.strokeWeight(p.vertices[v].r);
            p.point(p.vertices[v].x, p.vertices[v].y);
        }
        if (p.currV !== null) {
            p.stroke(255, 0, 100, 50);
            p.strokeWeight(p.vertices[p.currV].r * 2);
            p.point(p.vertices[p.currV].x, p.vertices[p.currV].y);
            p.stroke(255, 0, 100);
            p.strokeWeight(p.vertices[p.currV].r);
            p.point(p.vertices[p.currV].x, p.vertices[p.currV].y);
        }
    }

}

var prims = new p5(prim);
