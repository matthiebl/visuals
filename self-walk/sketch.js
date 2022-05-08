
let backColour;
let blueColour;
let redColour;

function setupColours() {
    backColour = color(14, 26, 36)
    blueColour = color(61, 184, 240)
    redColour = color(243, 18, 84)
}

let n;
let cellW;
let cellH;

let visited;
let previous;
let possibleMoves = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 }
];
let pathLength;

let dot;

function setup(size=5) {
    var cnv = createCanvas(0.75 * windowWidth, windowHeight);
    cnv.parent('sketch');
    
    loop();
    setupColours();
    
    n = size;
    cellW = width / n;
    cellH = height / n;
    
    visited = [];
    previous = [];
    for (let i = 0; i < n; i++) {
        visited[i] = [];
        previous[i] = [];
        for (let j = 0; j < n; j++) {
            visited[i][j] = false;
            previous[i][j] = null;
        }
    }
    pathLength = 0;

    dot = { x: 0, y: 0 };
}

function step() {
    visited[dot.x][dot.y] = true;

    // Check if the entire grid has been visited
    let allVisited = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                allVisited = false;
            }
        }
    }
    if (allVisited) {
        noLoop();
    }

    // Find possible moves
    let possible = [];
    for (let move of possibleMoves) {
        let newX = dot.x + move.dx;
        let newY = dot.y + move.dy;
        if (isValid(newX, newY)) {
            possible.push({ x: newX, y: newY });
        }
    }
    if (possible.length === 0) {
        // Backtrack a random amount of moves
        let backtrack = floor(random(1, pathLength));
        curr = dot;
        while (previous[curr.x][curr.y] !== null && backtrack > 0) {
            let prev = previous[curr.x][curr.y];
            visited[curr.x][curr.y] = false;
            previous[curr.x][curr.y] = null;
            curr = prev;

            backtrack--;
            pathLength--;
        }
        dot = curr;
    } else {
        // Choose a random move
        let move = possible[floor(random(possible.length))];
        previous[move.x][move.y] = dot;
        dot = move;

        pathLength++;
    }
}

function draw() {
    background(backColour);

    translate(cellW / 2, cellH / 2);
    
    noFill();
    stroke(255);

    // Draw small dot at every position
    strokeWeight(min(cellW, cellH) / 20);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            point(i * cellW, j * cellH);
        }
    }

    // Draw pred path
    let curr = dot;
    beginShape();
    while (curr !== null) {
        strokeWeight(min(cellW, cellH) / 7);
        vertex(curr.x * cellW, curr.y * cellH);
        curr = previous[curr.x][curr.y];
    }
    endShape();

    // Draw current dot
    stroke(blueColour);
    strokeWeight(min(cellW, cellH) / 3);
    point(dot.x * cellW, dot.y * cellH);

    step();
}

function isValid(x, y) {
    if (x < 0 || x >= n || y < 0 || y >= n) {
        return false;
    }
    return !visited[x][y];
}
