# Delaunay Triangulation

## General Info

This is a representation of the Delaunay triangulation of a set of points.
At each step of the simulation, a new point is added to the set of points,
and the triangulation is updated.

This is implemented with the Bowyer-Watson algorithm.
The purpose of this program is to be able to produce a visually pleasing
planar graph.

Try it out [here](https://matthiebl.github.io/visuals/graphs/delaunay-triangulation/)!

Made with p5 library for JS

## Credit

This code is all written myself, although as stated above the algorithm used
is the <a href="https://en.wikipedia.org/wiki/Bowyer%E2%80%93Watson_algorithm" target="_blank">Bowyer-Watson</a>
algorithm.

More info on Delaunay triangulation
<a href="https://en.wikipedia.org/wiki/Delaunay_triangulation" target="_blank">here</a>.



## How to Set Up Locally

If you want to be able to actually use this code to produce a planar graph,
use and follow the code inside `useful-version/`.

If you just want to set this up locally or play around with it, you need
the `delaunay-triangulation/` folder and the p5js libararies
folder `../../libraries/`.

Either keep a similar directory tree as the repo:
```
project
|
├── libraries
|   └── ...
└── graphs
    └── delaunay-triangulation
        ├── index.html
        ├── sketch.js
        ├── Triangle.js
        └── ...
```

or alter the relative path directory in `index.html` for the library files.

Then opening the `index.html` file in a browser should display the canvas!
