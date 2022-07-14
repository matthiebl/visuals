
let backColour;
let blueColour;
let redColour;
let yellowColour;
let greenColour;

function setupColours() {
    backColour = color(25, 45, 63);
    blueColour = color(61, 184, 240);
    redColour = color(243, 18, 84);
    yellowColour = color(255, 202, 58);
    greenColour = color(138, 201, 38);
}

let vertices;

let pG;
let pAllE;
let pC;
let pE;
let pQ;
let pCurrV;
let pF;
let pMST;

let kG;
let kS;
let kF;
let kMSTV;
let kMSTE;
let kCurrE;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('visual');
    setupColours();
    windowResized();
}

function reset() {
    frameRate(60);
    let nV = select('#numVert').value();

    // Create some dummy vertices
    let r = width / 40 * 3 / (nV ** 0.35);
    vertices = [];
    for (let i = 0; i < nV; i++) {
        let x = random(r + 5, width / 2 - (r + 5));
        let y = random(r + 5, height - (r + 5));
        while (vertices.some(v => dist(v.x, v.y, x, y) < 2 * r)) {
            x = random(r + 5, width / 2 - (r + 5));
            y = random(r + 5, height - (r + 5));
        }
        vertices.push({
            x: x,
            y: y,
            r: r,
        });
    }

    resetPrims();
    resetKruskals();
}

function windowResized() {
    const navbar = document.getElementById('navbar');
    const visualContainer = document.getElementById('visual');
    windowWidth = visualContainer.offsetWidth;
    windowHeight = window.innerHeight - navbar.offsetHeight;
    resizeCanvas(windowWidth, windowHeight, false);

    reset();
}

function draw() {
    let rawSpeed = select('#speed').value();
    if (rawSpeed === 0) {
        frameRate(60);
    } else {
        let solveSpeed = map(rawSpeed, 0, 100, 0.75, 4) ** 3;
        frameRate(solveSpeed);
        step();
    }

    clear();
    stroke(255);
    strokeWeight(0.1);
    line(width / 2, 15, width / 2, height - 15);
    drawPrims();
    drawKruskals();
}

function step() {
    stepPrims();
    stepKruskals();
}

function stepPrims() {
    if (pQ.length === 0) {
        pCurrV = null;
        return;
    }

    // Find min cost edge in Q and remove it
    let v = pQ[0];
    for (let i = 0; i < pQ.length; i++) {
        if (pC[pQ[i]] < pC[v]) {
            v = pQ[i];
        }
    }
    pQ.splice(pQ.indexOf(v), 1);
    pCurrV = v;
    
    // Add v to F
    pF.push(v);
    if (pE[v] !== -1) {
        // Add E[v] to F
        pF.push(pE[v]);
    }
    
    // Find neighbours of v
    let neighbours = pG.getNeighbours(v);
    for (let w of neighbours) {
        if (pQ.includes(w)) {
            // Update C[w]
            if (pG.getEdge(v, w) < pC[w]) {
                pC[w] = pG.getEdge(v, w);
                pE[w] = v;
            }
        } else {
            pAllE.splice(pAllE.indexOf([v, w]), 1);
        }
    }
    if (pE[v] !== -1) {
        pMST.push([v, pE[v]])
    }
}

function stepKruskals() {
    if (kF.length === 1) {
        kCurrE = null;
        return;
    }
    let [u, v, w] = kS.shift();
    kCurrE = [u, v];
    let setIndexU;
    let setIndexV;
    for (let i = 0; i < kF.length; i++) {
        if (kF[i].has(u)) {
            setIndexU = i;
        }
        if (kF[i].has(v)) {
            setIndexV = i;
        }
    }
    if (setIndexU !== setIndexV) {
        kMSTV.add(u);
        kMSTV.add(v);
        kMSTE.push([u, v]);
        let setU = kF.splice(setIndexU, 1);
        if (setIndexU < setIndexV) {
            setIndexV--;
        }
        for (let ui of setU[0]) {
            kF[setIndexV].add(ui);
        }
    }
}

function drawPrims() {
    // Edges to consider for MST
    for (let w = 0; w < pE.length; w++) {
        let v = pE[w];
        if (v !== -1) {
            stroke(redColour);
            strokeWeight(2);
            line(vertices[v].x, vertices[v].y, vertices[w].x, vertices[w].y);
        }
    }
    // Edges in MST
    for (let [v, w] of pMST) {
        stroke(255);
        strokeWeight(min(10, vertices[v].r / 5));
        line(vertices[v].x, vertices[v].y, vertices[w].x, vertices[w].y);
    }
        
    // Draw the vertices of the graph
    for (let v of pQ) {
        fill(backColour);
        stroke(255);
        strokeWeight(3);
        circle(vertices[v].x, vertices[v].y, vertices[v].r - 4);
    }

    // Draw the vertices of the MST
    for (let v of pF) {
        stroke(255);
        strokeWeight(vertices[v].r);
        point(vertices[v].x, vertices[v].y);
    }
    if (pCurrV !== null) {
        stroke(redColour);
        strokeWeight(vertices[pCurrV].r);
        point(vertices[pCurrV].x, vertices[pCurrV].y);
    }
}

function drawKruskals() {
    // Edges in MST
    for (let [v, w] of kMSTE) {
        stroke(255);
        strokeWeight(min(10, vertices[v].r / 5));
        line(width / 2 + vertices[v].x, vertices[v].y, width / 2 + vertices[w].x, vertices[w].y);
    }
    if (kCurrE != null) {
        let [u, v] = kCurrE;
        stroke(redColour);
        strokeWeight(min(10, vertices[v].r / 5));
        line(width / 2 + vertices[u].x, vertices[u].y, width / 2 + vertices[v].x, vertices[v].y);
    }

    // Draw the vertices of the graph
    for (let v of vertices) {
        fill(backColour);
        stroke(255);
        strokeWeight(3);
        circle(width / 2 + v.x, v.y, v.r - 4);
    }
    for (let v of kMSTV) {
        stroke(255);
        strokeWeight(vertices[v].r);
        point(width / 2 + vertices[v].x, vertices[v].y);
    }
}

function resetPrims() {
    pG = new Graph(select('#numVert').value())

    pAllE = [];
    for (let i = 0; i < pG.getNumVertices(); i++) {
        for (let j = i + 1; j < pG.getNumVertices(); j++) {
            pG.addEdge(i, j, dist(vertices[i].x, vertices[i].y, vertices[j].x, vertices[j].y));
            pAllE.push([i, j]);
        }
    }

    pC = [];
    pE = [];
    pQ = [];
    for (let v = 0; v < pG.getNumVertices(); v++) {
        pC[v] = Infinity;
        pE[v] = -1;
        pQ.push(v)
    }
    
    pF = [];
    pMST = [];
    pCurrV = null;
}

function resetKruskals() {
    kG = new Graph(select('#numVert').value())

    kS = [];
    for (let u = 0; u < kG.getNumVertices(); u++) {
        for (let v = u + 1; v < kG.getNumVertices(); v++) {
            const w = dist(vertices[u].x, vertices[u].y, vertices[v].x, vertices[v].y);
            kG.addEdge(u, v, w);
            kS.push([u, v, w]);
        }
    }
    kS.sort(([v1, w1, d1], [v2, w2, d2]) => d1 - d2);

    kF = [];
    for (let v = 0; v < kG.getNumVertices(); v++) {
        kF[v] = new Set([v]);
    }
    kMSTV = new Set([]);
    kMSTE = [];
    kCurrE = null;
}