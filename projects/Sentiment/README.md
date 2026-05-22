# Mood Meter: Sentiment Analyzer

## Assignment
Sentiment (Customized) Assignment

## Description
This project is a customized sentiment analysis application built with p5.js and ml5.js. The user types text into the app, and the MovieReviews sentiment model predicts how negative or positive the text sounds. The design turns the number into a small emotional weather report with a category label, emoji, stars, and a meter bar.

The model result is approximate. It was trained on movie reviews, so it works best with review style sentences and may give strange results for very short, vague, sarcastic, or unrelated text.

## Files Included
- index.html
- sketch.js
- style.css
- reflection.md
- screenshots/
- sentiment-screenshot.png

## How to Run
Open `index.html` in a browser, or paste the files into the p5.js Web Editor.

Because the project uses online p5.js and ml5.js library links, an internet connection is needed when the page loads.

## How to Use
1. Wait for the model status to say "Model ready."
2. Type a short sentence or movie-review-style comment.
3. Click Analyze or press Enter.
4. View the sentiment score, raw confidence, category, emoji, stars, and meter bar.
5. Try the example buttons to compare positive, negative, neutral, and mixed text.
6. Use Clear to reset the input and result.
7. Use Clear History to remove saved predictions from the page.

## Features
- ml5.js MovieReviews sentiment model
- p5.js `preload()` and `setup()` structure
- Large textarea input
- Analyze and Clear buttons
- Enter key submission
- Empty input message
- Raw confidence score
- Percentage score using `Math.round(score * 100)`
- Category label
- Emoji interpretation
- 1-5 star rating
- Animated sentiment meter bar
- Positive, negative, neutral, and mixed example buttons
- Last 5 prediction history
- Clear History button
- Responsive card layout
- Model limitation notes and beginner-friendly instructions

## JavaScript / p5.js / ml5.js Concepts Demonstrated
- Loading an ml5.js model with `ml5.sentiment("MovieReviews")`
- Using `sentiment.predict(text, gotResult)`
- p5.js lifecycle functions: `preload()` and `setup()`
- DOM selection and updates
- Event listeners for buttons and keyboard input
- Helper functions
- JavaScript conditionals
- Arrays and `slice()` for keeping only the last 5 predictions
- User interface feedback
- Model limitations and confidence scores

## Credits
- p5.js
- ml5.js
- MovieReviews sentiment model
- PROG 102 starter tutorial

## Future Improvements
- Add saved local history using `localStorage`.
- Add comparison mode for two reviews.
- Add colorblind-friendly meter options.
- Add a model limitations popup.
- Add a small animation when the category changes.
