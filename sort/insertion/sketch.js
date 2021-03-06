
let backColour;
let blueColour;
let redColour;
let yellowColour;
let greenColour;

function setupColours() {
    backColour = color(14, 26, 36);
    blueColour = color(61, 184, 240);
    redColour = color(243, 18, 84);
    yellowColour = color(255, 202, 58);
    greenColour = color(138, 201, 38);
}

let i, j;
let items;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('visual');
    setupColours();
    windowResized();
}

function reset() {
    items = [];
    for (let i = 0; i < width; i++) {
        items[i] = random(height);
    }

    i = j = 0;
}

function windowResized() {
    const navbar = document.getElementById('navbar');
    const visualContainer = document.getElementById('visual');
    windowWidth = visualContainer.offsetWidth;
    windowHeight = window.innerHeight - navbar.offsetHeight;
    resizeCanvas(0.7 * windowWidth, 0.6 * windowHeight, false);

    reset();
}

function draw() {
    clear();

    // Determine the style to display the items
    const allStyles = document.getElementsByName('visual');
    let thisStyle;
    for (const style of allStyles) {
        if (style.checked) {
            thisStyle = style.id;
        }
    }
    
    // Draw the items being sorted.
    strokeWeight(1);
    for (const [i, it] of items.entries()) {
        if (thisStyle === 'height') {
            colorMode(RGB, 255);
            stroke('#fff');
            line(i, height, i, height - it);
        } else if (thisStyle === 'colour') {
            colorMode(HSB, height);
            stroke(it, height, height);
            line(i, height, i, 0);
        }
    }
    
    colorMode(RGB);
    strokeWeight(3);
    if (thisStyle === 'height') stroke(redColour);
    else if (thisStyle === 'colour') stroke('#fff');
    line(i, 0, i, height);
    
    const speed = document.getElementById('speed').value ** 2;
    for (let loopCount = 0; loopCount < speed; loopCount++) {
        if (i >= items.length) {
            break;
        }
        if (j <= 0) {
            i++;
            j = i;
        } else {
            if (speed < 10) {
                strokeWeight(2);
                if (thisStyle === 'height') line(j, height, j, height - items[j]);
                else if (thisStyle === 'colour') line(j, height, j, 0);
            }
            
            // Once at the next item, insert it into its correct position to the left
            if (items[j] < items[j - 1]) {
                const temp = items[j];
                items[j] = items[j - 1];
                items[j - 1] = temp;
            } else {
                // If the item is in the correct order, no point in continuing
                j = 0;
            }
            j--;
        }
    }

    if (items.length <= i && i < 2 * items.length) {
        let trueI = i - items.length;
        if (thisStyle === 'height') line(trueI, height, trueI, height - items[trueI]);
        else if (thisStyle === 'colour') line(trueI, height, trueI, 0);

        i += 7;
    }
}
