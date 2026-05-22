# Image Insight: Subject Detector

## Assignment
Detect Image Subject Assignment

## Description
This project is a browser-based image classification app built with plain HTML,
CSS, JavaScript, TensorFlow.js, and the MobileNet model. The user can drag and
drop an image or choose one from their device, then the app predicts the subject
of the image and displays confidence scores.

## Files Included
- `index.html`
- `style.css`
- `script.js`
- `README.md`
- `reflection.md`
- `screenshots/`

## How to Run
Open `index.html` directly in a browser. The app needs an internet connection so
the TensorFlow.js and MobileNet CDN scripts can load.

## How to Use
1. Wait for the model loading message to change to `Model ready — drop or choose an image.`
2. Drag and drop an image into the upload area, or click the upload area to browse.
3. View the image preview and file name.
4. Wait for the app to analyze the image automatically, or click `Analyze image`.
5. Review the top prediction, top five prediction list, confidence percentages, and confidence bars.
6. Use `Reset image` to clear the preview and results.

## Features
- TensorFlow.js MobileNet image classification
- Model loading status message
- Simulated loading progress bar
- Drag-and-drop image upload
- Click-to-browse image upload
- Image file validation
- Image preview with alt text
- Uploaded file name display
- Automatic analysis after the image loads
- Top five predictions
- Confidence percentages
- Visual confidence bars
- Highlighted top prediction
- Reset button
- Friendly error messages
- Educational explanation panel
- Model limitations note
- Responsive polished design

## JavaScript Concepts Demonstrated
- DOM element selection
- Event listeners
- Drag-and-drop events
- File input handling
- Conditional logic
- Functions and helper functions
- Async/await
- Try/catch error handling
- Dynamic element creation
- CSS class updates from JavaScript
- `URL.createObjectURL(file)` for image previews
- `URL.revokeObjectURL()` for cleanup

## TensorFlow.js / MobileNet Concepts Demonstrated
- Loading a pre-trained model with `mobilenet.load()`
- Running image classification with `model.classify(img)`
- Reading prediction labels from `className`
- Reading model confidence from `probability`
- Converting probabilities into percentages
- Understanding that confidence scores are estimates, not guarantees

## Credits
- TensorFlow.js
- TensorFlow MobileNet model
- PROG 102 starter demo
- Project title and custom interface: Image Insight: Subject Detector

## Future Improvements
- Add a gallery of previous uploads.
- Add side-by-side image comparisons.
- Add a confidence threshold warning.
- Add local image history.
- Add an option to copy or export prediction results.
