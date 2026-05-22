# Detect Image Subject Reflection

## What the App Does
This app lets the user upload an image and uses TensorFlow.js with the MobileNet
model to predict the subject of the image. The app previews the uploaded image,
analyzes it in the browser, and displays the model's top five predictions with
confidence percentages and visual confidence bars.

## What I Changed From the Starter Demo
The starter demo had a basic drop zone, preview image, progress bar, and one
prediction result. I expanded it into a more polished tool called Image Insight:
Subject Detector. I added a cleaner layout, file validation, file name display,
top-five predictions, confidence bars, a reset button, an analyze button, example
image instructions, and educational notes about how MobileNet works.

## Significant Improvements
1. I added a top-five prediction list instead of only showing the highest prediction.
2. I added visual confidence bars so the model's confidence is easier to understand.
3. I improved the drag-and-drop interface with hover feedback and click-to-browse behavior.
4. I added image file validation, missing-image messages, and error handling for failed analysis.
5. I added a reset button that clears the preview, file name, predictions, status message, and file input.
6. I added an explanation panel and limitations note so the app is more educational.

## What I Learned About TensorFlow.js
I learned that TensorFlow.js can run a machine learning model directly in the
browser. The app does not need backend code because the model loads on the page
and analyzes the preview image using JavaScript.

## What I Learned About MobileNet
I learned that MobileNet is a pre-trained image classification model. It already
has learned visual patterns from training data, so I can load it and use it
without training my own model.

## What I Learned About Image Classification
I learned that image classification returns labels and probabilities. The model
does not give one perfect answer. Instead, it gives possible labels with
confidence scores that show how strongly the model matches the image to each
category.

## What I Learned About Drag-and-Drop File Uploads
I learned how to use drag-and-drop events such as `dragover`, `dragenter`,
`dragleave`, and `drop`. I also learned that the browser needs `event.preventDefault()`
so an image can be dropped into the custom upload area.

## What I Learned About Async JavaScript
I learned that model loading and image analysis take time, so async JavaScript is
important. I used `async` and `await` to wait for `mobilenet.load()` and
`model.classify(img)` before updating the results on the page.

## What I Learned About Model Confidence
I learned that confidence is a probability, not a promise that the prediction is
correct. A high confidence score means the model found a strong match, while a
low score means the model is less certain.

## What I Learned About AI Limitations
MobileNet can make incorrect predictions, especially when images are blurry,
cropped, stylized, dark, unusual, or outside the categories it was trained on.
The model recognizes learned visual patterns, but it does not truly understand
images like a human.

## What I Would Improve Next
I would add a way to compare multiple images, save prediction history, and show a
confidence warning when the model is unsure. I would also like to add sample
images for testing if the assignment allowed local assets.