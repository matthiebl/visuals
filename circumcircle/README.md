# Circumcircle

## General Info

This is a really simple visual that shows the circumcircle of a triangle.
It then colours the triangle depending on whether the mouse is located inside
or outside the circumcircle.

Try it out [here](https://matthiebl.github.io/visuals/circumcircle/)!

Made with p5 library for JS

## Credit

All code was written by myself, however the function to check if a point is
inside the circumcircle was taken from
<a href="https://stackoverflow.com/questions/39984709/how-can-i-check-wether-a-point-is-inside-the-circumcircle-of-3-points" target="_blank">this</a>
stackoverflow answer.



## How to Set Up Locally

If you want to set this up locally to play around, you need the `circumcircle/` folder
as well as the p5js libararies folder `../libraries/`.

Either keep a similar directory tree as the repo:
```
project
|
├── libraries
|   └── ...
└── circumcircle
    ├── index.html
    ├── sketch.js
    └── ...
```

or alter the relative path directory in `index.html` for the library files.

Then opening the `index.html` file in a browser should display the canvas!
