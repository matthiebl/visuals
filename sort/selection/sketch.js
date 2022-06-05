
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

let minimum;

function setup() {
    var cnv = createCanvas(windowWidth * 0.6, min(windowHeight * 0.4, 400));
    cnv.parent('canvas');
    
    setupColours();

    items = [];
    for (let i = 0; i < width; i++) {
        items[i] = random(height);
    }

    i = j = 0;
    minimum = i;
}

function draw() {
    background(backColour);

    // Determine the style to display the items
    const allStyles = document.getElementsByName('visual');
    let thisStyle;
    for (const style of allStyles) {
        if (style.checked) {
            thisStyle = style.value;
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
    
    // Bubble down one item and draw the point where the items have been sorted to.
    colorMode(RGB);
    strokeWeight(3);
    if (thisStyle === 'height') stroke(redColour);
    else if (thisStyle === 'colour') stroke('#fff');
    line(i, 0, i, height);
    
    const speed = map(document.getElementById('speed').value, 1, 10, 5, 25) ** 2;
    for (let loopCount = 0; loopCount < speed; loopCount++) {
        if (i >= items.length) {
            break;
        }
        // If at the end of the array, go back to start at the next element.
        if (j >= items.length) {
            const temp = items[i];
            items[i] = items[minimum];
            items[minimum] = temp;
            i++;
            j = minimum = i;
        } else {
            if (speed < 100) {
                strokeWeight(2);
                if (thisStyle === 'height') line(j, height, j, height - items[j]);
                else if (thisStyle === 'colour') line(j, height, j, 0);
            }
            
            // Check if the current item is smaller than the minimum.
            if (items[j] < items[minimum]) {
                minimum = j;
            }
            j++;
        }
    }

    if (items.length <= i && i < 2 * items.length) {
        let trueI = i - items.length;
        if (thisStyle === 'height') line(trueI, height, trueI, height - items[trueI]);
        else if (thisStyle === 'colour') line(trueI, height, trueI, 0);

        i += 7;
    }
}

// function draw() {
//     background(0);
    
//     // Draw the items being sorted.
//     strokeWeight(1);
//     for (const [i, it] of items.entries()) {
//         if (thisStyle === 'height') {
//             colorMode(RGB, 255);
//             stroke('#fff');
//             line(i, height, i, height - it);
//         } else if (thisStyle === 'colour') {
//             colorMode(HSB, 255);
//             stroke(it, 255, 255);
//             line(i, height, i, 0);
//         }
//     }
    
//     // Bubble down one item and draw the point where the items have been sorted to.
//     colorMode(RGB);
//     strokeWeight(3);
//     if (thisStyle === 'height') stroke(redColour);
//     else if (thisStyle === 'colour') stroke('#fff');
//     if (i < items.length) {
//         line(i, 0, i, height);
//         // Find the smallest value in the rest of the array.
//         let min = i;
//         for (let j = i; j <= items.length; j++) {
//             if (items[j] < items[min]) {
//                 min = j;
//             }
//         }
//         // Swap the smallest item with the current item.
//         const temp = items[i];
//         items[i] = items[min];
//         items[min] = temp;
        
//         i++;
//     } else if (i < 2 * items.length) {
//         let trueI = i - items.length;
//         if (thisStyle === 'height') line(trueI, height, trueI, height - items[trueI]);
//         else if (thisStyle === 'colour') line(trueI, height, trueI, 0);

//         i += 5;
//     }
// }
