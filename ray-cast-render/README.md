# Ray Tracing View Render

## General Info

This is a simple ray tracer that renders a scene using a primitive ray-casting algorithm. The large view is a top-down view of the scene. The smaller view is the a 3D-esque perspective of the camera.

You can use the mouse to point the camera and the arrow or WASD keys to move the camera.

There is a slight fish-eye effect due to using the Euclidean distance from the camera to the wall but for the 30 degree view range it's not too bad.

Try it out [here](https://matthiebl.github.io/visuals/ray-cast-render/)!

Made with p5 library for JS

## Credit

Ray tracing credit goes to Daniel Shiffman.
Code adapted from The Coding Train,
Coding Challende #145 ([youtube link](https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain)).

The camera rendering was done by myself.



## How to Set Up Locally

If you want to set this up locally to play around, you need the `ray-cast-render/` folder
as well as the p5js libararies folder `../libraries/`.

Either keep a similar directory tree as the repo:
```
project
|
├── libraries
|   └── ...
└── ray-cast-render
    ├── index.html
    ├── sketch.js
    └── ...
```

or alter the relative path directory in `index.html` for the library files.

Then opening the `index.html` file in a browser should display the canvas!
