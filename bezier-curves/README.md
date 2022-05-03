# Bézier Curves

## General Info

This is a representation of a Bézier curve.

Try it out [here](https://matthiebl.github.io/visuals/bezier-curves/)!

Made with p5 library for JS

## Credit

This code is all written myself, the algorithm for Bézier Curves comes from
the standard <a href="https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Specific_cases" target="_blank">Bézier Curve</a>
calculation.

The appearance of the visual was also heavily inspired from 
<a href="https://www.youtube.com/watch?v=aVwxzDHniEw&ab_channel=FreyaHolm%C3%A9r" target="_blank">this video</a>
by Freya Holmér.



## How to Set Up Locally

If you just want to set this up locally or play around with it, you need
the `bezier-curves/` folder and the p5js libararies
folder `../libraries/`.

Either keep a similar directory tree as the repo:
```
project
|
├── libraries
|   └── ...
└── bezier-curves
    ├── index.html
    ├── sketch.js
    └── ...
```

or alter the relative path directory in `index.html` for the library files.

Then opening the `index.html` file in a browser should display the canvas!
