# Self-Avoiding Walk

## General Info

This is a representation of a self-avoiding walk in a grid.

The problem to determine the number of self-avoiding walks in a lattice
is currently not solvable. The method I have implemented is even worse than
a brute force solution, which in itself is very very slow.

Some improvements could be made such as using a more efficient data structure,
trying every possibility but terminating branched early if a walk will not
be obtainable. This could include stopping when the path splits the grid into
two parts.

Try it out [here](https://matthiebl.github.io/visuals/self-walk/)!

Made with p5 library for JS

## Credit

This code is all written myself.



## How to Set Up Locally

If you just want to set this up locally or play around with it, you need
the `self-walk/` folder and the p5js libararies
folder `../libraries/`.

Either keep a similar directory tree as the repo:
```
project
|
├── libraries
|   └── ...
└── self-walk
    ├── index.html
    ├── sketch.js
    └── ...
```

or alter the relative path directory in `index.html` for the library files.

Then opening the `index.html` file in a browser should display the canvas!
