# AI Doodle Studio

## Assignment
Doodle App (ML) Assignment

## Description
AI Doodle Studio is an interactive drawing app built with p5.js and ml5.js. The user draws on a large canvas, and DoodleNet tries to classify the drawing using machine learning.

This version focuses on functionality first: drawing, tool buttons, clearing, saving, prompts, and visible prediction results.

## Files Included
- `index.html`
- `sketch.js`
- `style.css`
- `README.md`
- `reflection.md`
- `screenshots/`

## How to Run
Open `index.html` in a browser or paste the files into the p5.js Web Editor.

No npm, backend, build tools, React, or Vue are needed.

The app tries to load DoodleNet first. If a browser blocks the online DoodleNet model when the file is opened directly, the app automatically switches to a local practice mode instead of staying stuck on loading.

## How to Use
1. Wait for the model status to say `Model ready - start drawing!`
2. Draw one object on the canvas.
3. Watch the AI prediction update.
4. Use Pen, Marker, or Eraser.
5. Change the brush size with the slider.
6. Change the ink color with the color menu.
7. Use Clear to start over.
8. Use Save to download the drawing.

## Features
- Large 600 x 600 drawing canvas
- p5.js mouse drawing with `line(mouseX, mouseY, pmouseX, pmouseY)`
- ml5.js DoodleNet classification
- Local practice fallback if the browser blocks the DoodleNet model
- Classification loop that keeps updating predictions
- Clear button
- Save button using `saveCanvas(canvas, "doodle", "png")`
- Pen, marker, and eraser modes
- Brush-size slider
- Ink color menu
- Current brush mode, size, and color display
- Random drawing prompt button
- Top AI guess
- Top 3 predictions
- Confidence percentages
- Confidence bars
- Paper-like visual design
- Instructions panel
- Error handling

## Concepts Demonstrated
- p5.js canvas setup with `createCanvas()`
- Mouse interaction
- Drawing lines with `line()`
- JavaScript variables and functions
- DOM event handling
- Slider and menu input
- ml5.js image classification
- DoodleNet
- Prediction confidence
- Recursive classification loop with `classify()` inside `gotResults()`

## Credits
- p5.js
- ml5.js
- DoodleNet
- The Coding Train / Daniel Shiffman starter example and tutorial inspiration
- Quick, Draw! dataset inspiration

## Future Improvements
- Add keyboard shortcuts.
- Add more brush textures.
- Add timed drawing challenges.
- Add a score system.
- Add a gallery of saved doodles.
