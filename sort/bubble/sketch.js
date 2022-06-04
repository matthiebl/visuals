
let backColour;
let blueColour;
let redColour;

function setupColours() {
    backColour = color(14, 26, 36)
    blueColour = color(61, 184, 240)
    redColour = color(243, 18, 84)
}

let items;

let i;

let thisStyle;

function setup() {
    loop();

    var cnv = createCanvas(windowWidth * 0.6, 400);
    cnv.parent('canvas');
    
    setupColours();
    
    const allStyles = document.getElementsByName('visual');
    for (const style of allStyles) {
        console.log(style.ariaValueText);
        if (style.checked) {
            thisStyle = style.value;
        }
    }

    items = [];
    for (let i = 0; i < width; i++) {
        if (thisStyle === 'height') {
            items[i] = random(height);
        } else if (thisStyle === 'colour') {
            items[i] = random(0, 255);
        }
    }

    i = 0;
}

function draw() {
    background(0);
    
    // Draw the items being sorted.
    strokeWeight(1);
    for (const [i, it] of items.entries()) {
        if (thisStyle === 'height') {
            colorMode(RGB, 255);
            stroke('#fff');
            line(i, height, i, height - it);
        } else if (thisStyle === 'colour') {
            colorMode(HSB, 255);
            stroke(it, 255, 255);
            line(i, height, i, 0);
        }
    }
    
    // Bubble down one item and draw the point where the items have been sorted to.
    colorMode(RGB);
    strokeWeight(3);
    if (thisStyle === 'height') stroke(redColour);
    else if (thisStyle === 'colour') stroke('#fff');
    if (i < items.length) {
        line(i, 0, i, height);
        for (let j = items.length; j >= i; j--) {
            if (items[j] < items[j - 1]) {
                const temp = items[j];
                items[j] = items[j - 1];
                items[j - 1] = temp;
            }
        }
        i++;
    } else {
        if (thisStyle === 'height') line(i - items.length, height, i - items.length, height - items[i - items.length]);
        else if (thisStyle === 'colour') line(i - items.length, height, i - items.length, 0);
        
        if (i === 2 * items.length) {
            noLoop();
        }
        i += 5;
    }
}