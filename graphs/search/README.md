# Graph Traversal - BFS - DFS

## General Info

This is a visual representation of the BFS and DFS algorithms.

Try it out [here](https://matthiebl.github.io/visuals/graphs/search/)!

Made with p5 library for JS

## Credit

This code is completely written by myself, however the algorithms used for
BFS ([wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)) and
DFS ([wikipedia](https://en.wikipedia.org/wiki/Depth-first_search))
use the respective queue and stack implementations.



## How to Set Up Locally

If you want to set this up locally to play around, you need the the `search/`
folder as well as the graph class `../Graph.js` and the p5js libararies
folder `../../libraries/`.

Either keep a similar directory tree as the repo:
```
project
|
├── libraries
|   └── ...
└── graphs
    ├── search
    |   ├── index.html
    |   ├── bfs.js
    |   ├── dfs.js
    |   └── ...
    └── Graph.js
```

or alter the relative path directory in `index.html` for the library files.

Then opening the `index.html` file in a browser should display the canvas!
