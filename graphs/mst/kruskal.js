
var kruskal = function(p) {

    p.setup = function() {
        var cnv2 = p.createCanvas(0.375 * p.windowWidth, p.windowHeight);
        cnv2.parent('kruskal-sketch');

        p.g = new Graph(100);

        // Create some dummy edges
        p.r = p.width / 25;
        p.vertices = [];
        for (let i = 0; i < p.g.getNumVertices(); i++) {
            p.x = p.random(p.r + 5, p.width - (p.r + 5));
            p.y = p.random(p.r + 5, p.height - (p.r + 5));
            while (p.vertices.some(v => p.dist(v.x, v.y, p.x, p.y) < 2 * p.r)) {
                p.x = p.random(p.r + 5, p.width - (p.r + 5));
                p.y = p.random(p.r + 5, p.height - (p.r + 5));
            }

            p.vertices.push({
                x: p.x,
                y: p.y,
                r: p.r,
            });
        }
    }

    p.draw = function() {
        p.background(0);

        p.noFill();
        p.stroke(255);
        p.strokeWeight(10);
        p.rect(0, 0, p.width, p.height);

        for (let v of p.vertices) {
            p.stroke(255);
            p.strokeWeight(v.r);
            p.point(v.x, v.y);
        }
    }
}

var kruskals = new p5(kruskal);
