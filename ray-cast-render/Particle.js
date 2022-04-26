// Code adapted slightly from The Coding Train, Coding Challende #145:
// https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
// All credit goes to Daniel Shiffman.

// Particle class to represent a light source in the scene

class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (let angle = 0; angle < 360; angle += 1) {
            this.rays.push(new Ray(this.pos, radians(angle)));
        }
    }
    
    update(x, y) {
        this.pos.set(x, y);
    }
    
    // Project the rays onto the walls and display them
    project(walls) {
        // Circle for the particle
        fill(255);
        circle(this.pos.x, this.pos.y, 10);

        stroke(255, 70);
        for (let ray of this.rays) {
            // Find the closest wall by distance from particle
            let dist = Infinity;
            let closest;
            for (let wall of walls) {
                const pt = ray.intersection(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < dist) {
                    dist = d;
                    closest = pt;
                    }
                }
            }
            // Draw the ray is there is an intersection with a wall
            if (closest) {
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }
}
