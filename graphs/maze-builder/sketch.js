
let maze;
let start;
let end;
let w;
let h;
let sqw;
let sqh;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('visual');
    windowResized();

    clear();
    frameRate(60);
}

function restart() {
    w = Math.floor(width / 20);
    w = w % 2 == 0 ? w - 1 : w;
    h = Math.floor(height / 20);
    h = h % 2 == 0 ? h - 1 : h;
    sqw = width / (w + 2);
    sqh = height / (h + 2);
    start = [0, 0];
    end = [w-1, h-1];
    randomizedPrims(start, end, w, h);
}

function windowResized() {
  const navbar = document.getElementById('navbar');
  const visualContainer = document.getElementById('visual');
  windowWidth = visualContainer.offsetWidth;
  windowHeight = window.innerHeight - navbar.offsetHeight;
  resizeCanvas(windowWidth, windowHeight, false);

  restart();
}

function randomizedPrims(start, end, width, height) {
    maze = []
    for (let i = 0; i < width; i++) {
        maze[i] = [];
        for (let j = 0; j < height; j++) {
            maze[i][j] = false;
        }
    }

    let [sx, sy] = start;
    let [ex, ey] = end;

    maze[sx][sy] = true;

    let options = [[sx + 2, sy], [sx, sy + 2], [sx - 2, sy], [sx, sy - 2]];
    options = options.filter(([x, y]) => !(x < 0 || y < 0 || x >= width || y >= height));

    while (options.length > 0) {
        // let next = random(options);
        // options.splice(options.indexOf(next), 1);
        let next = options.pop();
        
        let [nx, ny] = next;
        
        let neighbours = [[nx + 2, ny], [nx, ny + 2], [nx - 2, ny], [nx, ny - 2]];
        neighbours = neighbours.filter(([x, y]) => !(x < 0 || y < 0 || x >= width || y >= height) && maze[x][y]);

        if (neighbours.length > 0) {
            let neighbour = random(neighbours);
            neighbours.splice(neighbours.indexOf(neighbour), 1);
            // let neighbour = neighbours.pop();

            let [tx, ty] = neighbour;

            maze[nx][ny] = true;
            maze[(nx+tx) / 2][(ny+ty) / 2] = true;
            maze[tx][ty] = true;
        }

        neighbours = [[nx + 2, ny], [nx, ny + 2], [nx - 2, ny], [nx, ny - 2]];
        neighbours = neighbours.filter(([x, y]) => !(x < 0 || y < 0 || x >= width || y >= height) && !maze[x][y]);
        for (let neighbour of neighbours) {
            options.push(neighbour);
        }
    }
    
    if (!maze[ex][ey]) {
        maze[ex][ey] = true;

        let neighbours = [[ex + 1, ey], [ex, ey + 1], [ex - 1, ey], [ex, ey - 1]];
        neighbours = neighbours.filter(([x, y]) => !(x < 0 || y < 0 || x >= width || y >= height) && !maze[x][y]);
        if (neighbours.length > 0) {
            let [nx, ny] = random(neighbours);
            maze[nx][ny] = true;
        }
    }
}

function draw() {
    clear();

    translate(sqw, sqh);
    
    strokeWeight(1);
    fill(0);
    for (let i = 0; i < w + 2; i++) {
        rect((i-1)*sqw, -sqh, sqw, sqh);
        rect((i-1)*sqw, h*sqh, sqw, sqh);
    }
    for (let i = 0; i < h; i++) {
        rect(-sqw, i*sqh, sqw, sqh);
        rect(w*sqw, i*sqh, sqw, sqh);
    }
    
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            if (!maze[x][y]) {
                rect(x*sqw, y*sqh, sqw, sqh);
            }
        }
    }

    fill('green');
    let [x, y] = start;
    rect(x*sqw, y*sqh, sqw, sqh);

    fill('red');
    [x, y] = end;
    rect(x*sqw, y*sqh, sqw, sqh);
}
