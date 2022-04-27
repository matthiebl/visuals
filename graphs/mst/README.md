# Minimal Spanning Tree

## General Info

This is a visual representation of how the two main minimal spanning tree
algorithms - Prim's and Kruskal's - find the minimal spanning tree.

The graph is made from random vertices and the Euclidean distance between
them are used for the edges. This means the graphs are complete graphs.

Try it out [here](https://matthiebl.github.io/visuals/graphs/mst/)!

Made with p5 library for JS

## Credit

This code is completely written by myself, however the algorithms used for
Prim's ([wikipedia](https://en.wikipedia.org/wiki/Prim%27s_algorithm)) and
Kruskal's ([wikipedia](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm))
use the psuedocode as described on their relative wikipedia links.



## How to Set Up Locally

If you want to set this up locally to play around, you need the the `mst/`
folder as well as the graph class `../Graph.js` and the p5js libararies
folder `../../libraries/`.

Either keep a similar directory tree as the repo:
```
project
|
├── libraries
|   └── ...
└── graphs
    ├── mst
    |   ├── index.html
    |   ├── prim.js
    |   ├── kruskal.js
    |   └── ...
    └── Graph.js
```

or alter the relative path directory in `index.html` for the library files.

Then opening the `index.html` file in a browser should display the canvas!
