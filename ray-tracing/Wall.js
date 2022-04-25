// Code adapted slightly from The Coding Train, Coding Challende #145:
// https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
// All credit goes to Daniel Shiffman.

// Wall class to act as a wall in the scene

class Wall {
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }
    
    show() {
        stroke(255);
        strokeWeight(1);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}
