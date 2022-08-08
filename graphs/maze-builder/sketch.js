
let maze;
let walls;
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
    end = [w - 1, h - 1];

    maze = []
    for (let i = 0; i < width; i++) {
        maze[i] = [];
        for (let j = 0; j < height; j++) {
            maze[i][j] = false;
        }
    }

    maze[0][0] = true;

    walls = [[1, 0], [0, 1]];
}

function windowResized() {
    const navbar = document.getElementById('navbar');
    const visualContainer = document.getElementById('visual');
    windowWidth = visualContainer.offsetWidth;
    windowHeight = window.innerHeight - navbar.offsetHeight;
    resizeCanvas(windowWidth, windowHeight, false);

    restart();
}

function draw() {
    clear();

    let speed = select('#speed').value();

    translate(sqw, sqh);

    let found = 0;
    while (walls.length > 0 && found < speed) {
        let wall = random(walls);
        walls.splice(walls.indexOf(wall), 1);

        let [wx, wy] = wall;

        let empty = [[wx, wy - 1], [wx, wy + 1], [wx - 1, wy], [wx + 1, wy]];
        empty = empty.filter(([x, y]) => !(x < 0 || y < 0 || x >= width || y >= height) && maze[x][y]);

        if (empty.length == 1) {
            let [tx, ty] = empty[0];

            maze[wx][wy] = true;

            let nx = wx + (wx - tx);
            let ny = wy + (wy - ty);

            maze[nx][ny] = true;

            let adj = [[nx, ny - 1], [nx, ny + 1], [nx - 1, ny], [nx + 1, ny]];
            adj = adj.filter(([x, y]) => !(x < 0 || y < 0 || x >= width || y >= height) && !maze[x][y]);

            walls.push(...adj);

            found++;
        }
    }

    fill('#2F5475');
    stroke('#2F5475');
    strokeWeight(10);

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            if (maze[x][y]) {
                rect(x * sqw, y * sqh, sqw, sqh);
            }
        }
    }

    fill('green');
    let [x, y] = start;
    rect(x * sqw, y * sqh, sqw, sqh);

    fill('red');
    [x, y] = end;
    rect(x * sqw, y * sqh, sqw, sqh);
}
