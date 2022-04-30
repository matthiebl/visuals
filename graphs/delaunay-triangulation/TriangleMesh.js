
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
            (ax_*ax_ + ay_*ay_) * (by_*cy_ - cy_*by_) -
            (bx_*bx_ + by_*by_) * (ay_*cx_ - ax_*cy_) +
            (cx_*cx_ + cy_*cy_) * (ax_*by_ - bx_*ay_)
        )
        if (this.isCounterClockwise()) {
            return det > 0;
        }
        return det < 0;
    }

    sharesEdge(e) {
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
}

class TriangleMesh {
    constructor() {
        this.triangles = [];
    }

    [Symbol.iterator]() {
        return this.triangles[Symbol.iterator]();
    }

    add(triangle) {
        this.triangles.push(triangle);
    }

    remove(triangle) {
        this.triangles.splice(this.triangles.indexOf(triangle), 1);
    }
}