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

    getNeighbours(v) {
        let neighbours = [];
        for (let i = 0; i < this.nV; i++) {
            if (this.m[v][i] !== 0) {
                neighbours.push(i);
            }
        }
        return neighbours;
    }
}