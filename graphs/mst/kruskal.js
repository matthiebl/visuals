
var kruskal = function(p) {

    p.setup = function() {
        var cnv2 = p.createCanvas(0.5 * p.windowWidth, p.windowHeight);
        cnv2.parent('visual2');
        p.seed = 0;
        p.windowResized();        
    }

    p.reset = function() {
        nV = p.select('#numVert').value();
        p.g = new Graph(nV);

        // Create some dummy edges
        let r = p.windowWidth / 30 * 3 / (nV ** 0.35);
        p.vertices = [];
        p.randomSeed(p.seed);
        for (let i = 0; i < p.g.getNumVertices(); i++) {
            let x = p.random(r + 5, p.windowWidth - (r + 5));
            let y = p.random(r + 5, p.height - (r + 5));
            while (p.vertices.some(v => p.dist(v.x, v.y, x, y) < 2 * r)) {
                x = p.random(r + 5, p.windowWidth - (r + 5));
                y = p.random(r + 5, p.height - (r + 5));
            }

            p.vertices.push({
                x: x,
                y: y,
                r: r,
            });
        }

        p.S = [];
        for (let u = 0; u < p.g.getNumVertices(); u++) {
            for (let v = u + 1; v < p.g.getNumVertices(); v++) {
                const w = p.dist(p.vertices[u].x, p.vertices[u].y, p.vertices[v].x, p.vertices[v].y);
                p.g.addEdge(u, v, w);
                p.S.push([u, v, w]);
            }
        }
        p.S.sort(([v1, w1, d1], [v2, w2, d2]) => d1 - d2);

        p.F = [];
        for (let v = 0; v < p.g.getNumVertices(); v++) {
            p.F[v] = new Set([v]);
        }
        p.mstVerts = new Set([]);
        p.mstEdges = [];
        p.currEdge = null;
    }
    
    p.windowResized = function() {
        const navbar = document.getElementById('navbar');
        const visualContainer = document.getElementById('visual2');
        p.windowWidth = visualContainer.offsetWidth;
        p.windowHeight = window.innerHeight - navbar.offsetHeight;
        p.resizeCanvas(0.5 * p.windowWidth, p.windowHeight, false);
    
        p.reset();
    }

    p.kruskalStep = function() {
        if (p.F.length === 1) {
            p.currEdge = null;
            return;
        }
        let [u, v, w] = p.S.shift();
        p.currEdge = [u, v];
        let setIndexU;
        let setIndexV;
        for (let i = 0; i < p.F.length; i++) {
            if (p.F[i].has(u)) {
                setIndexU = i;
            }
            if (p.F[i].has(v)) {
                setIndexV = i;
            }
        }
        if (setIndexU !== setIndexV) {
            p.mstVerts.add(u);
            p.mstVerts.add(v);
            p.mstEdges.push([u, v]);
            let setU = p.F.splice(setIndexU, 1);
            if (setIndexU < setIndexV) {
                setIndexV--;
            }
            for (let ui of setU[0]) {
                p.F[setIndexV].add(ui);
            }
        }
    }

    p.draw = function() {
        let rawSpeed = p.select('#speed').value();
        if (rawSpeed === 0) {
            p.frameRate(60);
        } else {
            let solveSpeed = p.map(rawSpeed, 0, 100, 0.75, 4) ** 3;
            p.frameRate(solveSpeed);
            p.kruskalStep();
        }

        p.clear();

        // p.noFill();
        // p.stroke(255);
        // p.strokeWeight(2);
        // p.rect(0, 0, p.windowWidth, p.height);

        // Edges in MST
        for (let [v, w] of p.mstEdges) {
            p.stroke(0, 0, 255);
            // p.strokeWeight(5);
            p.strokeWeight(p.min(6, p.vertices[v].r / 2.5));
            p.line(p.vertices[v].x, p.vertices[v].y, p.vertices[w].x, p.vertices[w].y);
        }
        if (p.currEdge != null) {
            let [u, v] = p.currEdge;
            p.stroke(255, 0, 100);
            p.strokeWeight(p.min(6, p.vertices[v].r / 2.5));
            p.line(p.vertices[u].x, p.vertices[u].y, p.vertices[v].x, p.vertices[v].y);
        }

        // Draw the vertices of the graph
        for (let v of p.vertices) {
            p.stroke(255);
            p.strokeWeight(v.r);
            p.point(v.x, v.y);
        }
        for (let v of p.mstVerts) {
            p.stroke(0, 255, 0);
            p.strokeWeight(p.vertices[v].r);
            p.point(p.vertices[v].x, p.vertices[v].y);
        }
    }

}

var kruskals = new p5(kruskal);
