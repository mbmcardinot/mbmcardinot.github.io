# Doodle App Reflection

## What the App Does
This app lets the user draw on a canvas and uses ml5.js DoodleNet to guess what the drawing might be. The AI keeps classifying the canvas in a loop and updates the prediction display while the user draws.

## What I Changed From the Starter Code
I expanded the starter app by adding a larger canvas, working tool buttons, a brush-size slider, an ink color menu, a save button, a random prompt button, top-three AI prediction results, and a local practice fallback if a browser blocks the DoodleNet model.

## Significant Improvements
1. I added pen, marker, and eraser modes.
2. I added brush-size and ink color controls.
3. I added top-three AI predictions with confidence bars.
4. I added Clear and Save buttons.
5. I improved the layout with a paper-like canvas and instructions.

## What I Learned
I learned that p5.js can create an interactive canvas and use mouse movement to draw lines with `mouseX`, `mouseY`, `pmouseX`, and `pmouseY`. I also learned how ml5.js can load DoodleNet and classify a drawing from the canvas.

DoodleNet uses image classification to compare a drawing to patterns from the Quick, Draw! dataset. Prediction confidence shows how strongly the model matches the drawing to a label, but the AI can still be wrong.

## AI Limitations
The model works best with simple black line drawings. It can struggle with messy sketches, colorful drawings, incomplete drawings, or objects that look similar.

## What I Would Improve Next
I would add a timer and a game mode where users try to draw prompts before time runs out. I would also add saved drawing history.
