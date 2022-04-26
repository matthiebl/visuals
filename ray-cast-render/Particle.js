// Code adapted slightly from The Coding Train, Coding Challende #145:
// https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
// All credit goes to Daniel Shiffman.

// Particle class to represent a light source in the scene

class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (let angle = 0; angle < 360; angle += 0.1) {
            this.rays.push(new Ray(this.pos, radians(angle)));
        }
        this.range = [30, 60];
    }
    
    update(x, y) {
        this.pos.set(x, y);
    }

    lookAt(x, y) {
        const dir = createVector(x - this.pos.x, y - this.pos.y);
        const base = createVector(1, 0);
        const raysInDegree = round(this.rays.length / 360);
        const buff = 15;
        let angle = round(degrees(base.angleBetween(dir)) * raysInDegree);
        console.log(this.rays.length, angle * raysInDegree);
        this.range = [angle - buff * raysInDegree, angle + buff * raysInDegree];
    }
    
    // Project the rays onto the walls and display them
    project(walls) {
        // Circle for the particle
        fill(255);
        circle(this.pos.x, this.pos.y, 10);

        stroke(255, 70);
        for (let i = this.range[0]; i < this.range[1]; i++) {
            let ray = i;
            if (i < 0) {
                ray += this.rays.length;
            }
            console.log(ray)
            // Find the closest wall by distance from particle
            let dist = Infinity;
            let closest = null;
            for (let wall of walls) {
                const pt = this.rays[ray].intersection(wall);
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
            this.rays[ray].dist = round(dist, 2);
        }
    }

    getDists() {
        let dists = [];
        for (let i = this.range[0]; i < this.range[1]; i++) {
            let ray = i;
            if (i < 0) {
                ray += this.rays.length;
            }
            dists.push(this.rays[ray].dist);
        }
        return dists;
    }
}
