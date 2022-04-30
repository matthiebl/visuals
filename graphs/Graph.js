// Graph class for p5

class Graph {
    constructor(nV) {
        this.nV = nV;
        this.nE = 0;
        this.m = [];

        for (let i = 0; i < nV; i++) {
            this.m[i] = [];
            for (let j = 0; j < nV; j++) {
                this.m[i][j] = 0;
            }
        }
    }
    
    getNumEdges() {
        return this.nE;
    }

    getNumVertices() {
        return this.nV;
    }

    addEdgeTo(v, w, c) {
        this.m[v][w] = c;
        this.nE++;
    }

    addEdge(v, w, c) {
        this.addEdgeTo(v, w, c);
        this.addEdgeTo(w, v, c);
    }

    getEdge(v, w) {
        return this.m[v][w];
    }

    // Returns a set of all the edges in the graph as vertex pairs.
    // Includes both (v, w) and (w, v) pairs.
    getAllEdgesTo() {
        let edges = new Set();
        for (let v = 0; v < this.nV; v++) {
            for (let w = 0; w < this.nV; w++) {
                if (this.m[v][w] !== 0) {
                    edges.add([v, w]);
                }
            }
        }
        return edges;
    }

    // Returns a set of all the edges in the graph as vertex pairs.
    // Assumes the graph is undirected.
    getAllEdges() {
        let edges = new Set();
        for (let v = 0; v < this.nV; v++) {
            for (let w = v + 1; w < this.nV; w++) {
                if (this.m[v][w] !== 0 && !edges.has([w, v])) {
                    edges.add([v, w]);
                }
            }
        }
        return edges;
    }

    // Returns a set of all the vertices adjacent to vertex, v.
    getNeighbours(v) {
        let neighbours = new Set();
        for (let i = 0; i < this.nV; i++) {
            if (this.m[v][i] !== 0) {
                neighbours.add(i);
            }
        }
        return neighbours;
    }

    // Returns a set of all the vertices a vertex, v can reach.
    getReachable(v) {
        // Uses BFS to find all reachable vertices.
        let reachable = new Set();
        let queue = [v];
        while (queue.length > 0) {
            let u = queue.shift();
            reachable.add(u);
            let neighbours = this.getNeighbours(u);
            for (let w of neighbours) {
                if (!reachable.has(w)) {
                    queue.push(w);
                }
            }
        }
        return reachable;
    }

    // Returns a boolean indicating if there is a path between v and w.
    isPath(v, w) {
        // This does not use early termination.
        return this.getReachable(v).has(w);
    }

    // Returns a list of edges ((v, w) pairs) that make the shortest path between v and w.
    getShortestPath(v, w) {
        return;
    }

    _dfsComponent(componentOf, v, id) {
        componentOf[v] = id;
        for (let w of this.getNeighbours(v)) {
            if (componentOf[w] === -1) {
                this._dfsComponent(componentOf, w, id);
            }
        }
    }

    // Returns a list with each index v contains the component id of vertex v.
    components() {
        let componentOf = [];
        componentOf.fill(-1);

        let id = 0;
        for (let v = 0; v < this.nV; v++) {
            if (componentOf[v] === -1) {
                _dfsComponent(componentOf, v, id);
                id++;
            }
        }
        return componentOf;
    }

    // Returns a boolean indicating if the graph is connected.
    isConnected() {
        if (this.components().every(v => v === 0)) {
            return true;
        }
        return false;
    }

    // Returns a new graph containing the MST of the original graph.
    // If the graph is not connected, returns null.
    mst() {
        if (!this.isConnected()) {
            return null;
        }
        // Uses Prim's algorithm to find the MST.
        let mst = new Graph(this.getNumVertices());

        let C = [];
        let E = [];
        let Q = new Set();
        for (let v = 0; v < this.getNumVertices(); v++) {
            C[v] = Infinity;
            E[v] = -1;
            Q.add(v);
        }
        let F = new Set();

        while (Q.size > 0) {
            // Find min cost edge in Q and remove it
            let v = Q.values().next().value;
            for (let w of Q) {
                if (C[w] < C[v]) {
                    v = w;
                }
            }
            Q.delete(v);
            F.add(v);
            if (E[v] !== -1) {
                F.add(E[v]);
                mst.addEdge(E[v], v, C[v]);
            }
            // Update C and E
            for (let w of this.getNeighbours(v)) {
                if (Q.has(w)) {
                    if (this.getEdge(v, w) < C[w]) {
                        C[w] = this.getEdge(v, w);
                        E[w] = v;
                    }
                }
            }
        }
        return mst;
    }

    // Returns a new graph containing a planar graph of the original graph.
    // Ignores any edges already in the original graph.
    planarGraph(points) {
        // Uses Bowyer-Watson delaunay triangulation to find the planar graph.
        let triangles = [];
        let superTriangle = new Triangle(new Point(800, -1000), new Point(3200, 1000), new Point(-1600, 1000));
        triangles.push(superTriangle);

        for (let point of points) {
            let badTriangles = [];
            for (let triangle of triangles) { // first find all the triangles that are no longer valid due to the insertion
                if (points.indexOf(point) !== 0 && triangle.equals(superTriangle)) {
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
                triangles.splice(triangles.indexOf(triangle), 1);
            }
            for (let edge of polygon) {// re-triangulate the polygonal hole
                triangles.push(new Triangle(edge.a, edge.b, point));
            }
        }
        let triCopy = triangles.slice();
        for (let triangle of triCopy) {// done inserting points, now clean up
            if (triangle.sharesPoint(superTriangle)) {
                triangles.splice(triangles.indexOf(triangle), 1);
            }
        }

        let planar = new Graph(this.getNumVertices());
        for (let triangle of triangles) {
            for (let edge of triangle.edges) {
                let a = points.indexOf(edge.a);
                let b = points.indexOf(edge.b);
                if (a !== -1 && b !== -1) {
                    planar.addEdge(a, b, edge.w);
                }
            }
        }
        return planar;
    } 
}

function once(arr, fn) {
    return arr.filter(fn).length === 1;
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}

class Edge {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.w = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    equals(other) {
        if (this.a.equals(other.a) && this.b.equals(other.b)) {
            return true;
        } else if (this.a.equals(other.b) && this.b.equals(other.a)) {
            return true;
        }
        return false;
    }
}

class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.edges = [new Edge(a, b), new Edge(b, c), new Edge(c, a)];
    }

    *points() {
        yield this.a;
        yield this.b;
        yield this.c;
    }

    isCounterClockwise() {
        return (this.b.x - this.a.x)*(this.c.y - this.a.y)-(this.c.x - this.a.x)*(this.b.y - this.a.y) > 0;
    }

    // Returns is a point d is inside the triangle defined by this.a, this.b, this.c.
    circumcircleContains(d) {
        const ax_ = this.a.x - d.x;
        const ay_ = this.a.y - d.y;
        const bx_ = this.b.x - d.x;
        const by_ = this.b.y - d.y;
        const cx_ = this.c.x - d.x;
        const cy_ = this.c.y - d.y;
        const det = (
            (ax_*ax_ + ay_*ay_) * (bx_*cy_ - cx_*by_) -
            (bx_*bx_ + by_*by_) * (ax_*cy_ - cx_*ay_) +
            (cx_*cx_ + cy_*cy_) * (ax_*by_ - bx_*ay_)
        )
        if (this.isCounterClockwise()) {
            return det > 0;
        }
        return det < 0;
    }

    containsEdge(e) {
        for (let edge of this.edges) {
            if (edge.equals(e)) {
                return true;
            }
        }
        return false;
    }

    sharesPoint(t) {
        for (let point of t.points()) {
            if (this.a.equals(point) || this.b.equals(point) || this.c.equals(point)) {
                return true;
            }
        }
        return false;
    }

    occurencesOf(edge) {
        let count = 0;

    }

    equals(other) {
        if (this.a.equals(other.a) && this.b.equals(other.b) && this.c.equals(other.c)) {
            return true;
        } else if (this.a.equals(other.a) && this.b.equals(other.c) && this.c.equals(other.b)) {
            return true;
        } else if (this.a.equals(other.b) && this.b.equals(other.a) && this.c.equals(other.c)) {
            return true;
        } else if (this.a.equals(other.b) && this.b.equals(other.c) && this.c.equals(other.a)) {
            return true;
        } else if (this.a.equals(other.c) && this.b.equals(other.a) && this.c.equals(other.b)) {
            return true;
        } else if (this.a.equals(other.c) && this.b.equals(other.b) && this.c.equals(other.a)) {
            return true;
        }
        return false;
    }
}
