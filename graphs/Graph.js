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

    dfsComponent(componentOf, v, id) {
        componentOf[v] = id;
        for (let w of this.getNeighbours(v)) {
            if (componentOf[w] === -1) {
                this.dfsComponent(componentOf, w, id);
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
                console.log(componentOf.toString());
                dfsComponent(componentOf, v, id);
                console.log(componentOf.toString());
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
    mstPrims() {
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
}