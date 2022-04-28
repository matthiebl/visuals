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

    // Returns a boolean indicating if the graph is connected.
    isConnected() {
        // Uses a slow but correct algorithm.
        for (let v = 0; v < this.nV; v++) {
            if (!this.isPath(0, v)) {
                return false;
            }
        }
        return true;
    }
}