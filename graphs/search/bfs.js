
var bfs = function(p) {

    p.setup = function(nV=50, seed=0) {
        var cnv1 = p.createCanvas(0.375 * p.windowWidth, p.windowHeight);
        cnv1.parent('bfs-sketch');

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
    }

}

var bfsSketch = new p5(bfs);
