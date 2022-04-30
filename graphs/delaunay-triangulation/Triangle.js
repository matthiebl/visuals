
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
