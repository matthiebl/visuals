// Code adapted slightly from The Coding Train, Coding Challende #145:
// https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
// All credit goes to Daniel Shiffman.

// Ray class to act as invisible ray vectors for a particle

class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
        this.dist = null;
    }

    // Find the point of intersection between the ray and a wall
    // If no intersection, return null
    // Calculation from:
    // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
    intersection(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;
        
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return null;
        }
        
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        
        if (0 < t && t < 1 && u > 0) {
            return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
        }
        return null;
    }
}
