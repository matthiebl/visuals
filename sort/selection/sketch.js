
let backColour;
let blueColour;
let redColour;

function setupColours() {
    backColour = color(14, 26, 36)
    blueColour = color(61, 184, 240)
    redColour = color(243, 18, 84)
}

let thisStyle;

let items;

let i;

function setup() {
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
        // Find the smallest value in the rest of the array.
        let min = i;
        for (let j = i; j <= items.length; j++) {
            if (items[j] < items[min]) {
                min = j;
            }
        }
        // Swap the smallest item with the current item.
        const temp = items[i];
        items[i] = items[min];
        items[min] = temp;
        
        i++;
    } else if (i < 2 * items.length) {
        let trueI = i - items.length;
        if (thisStyle === 'height') line(trueI, height, trueI, height - items[trueI]);
        else if (thisStyle === 'colour') line(trueI, height, trueI, 0);

        i += 5;
    }
}
