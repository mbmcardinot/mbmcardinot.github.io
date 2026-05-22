# Sentiment Customized Reflection

## What the App Does
This app analyzes a sentence or short review and predicts whether the text sounds negative, neutral, or positive. It uses the ml5.js MovieReviews sentiment model and shows the result as a raw confidence score, a percentage, a category label, an emoji, a star rating, and a meter bar.

## What I Changed From the Starter Code
The starter code only displayed the raw sentiment confidence score. I expanded it into a more complete interface with visual feedback, example text buttons, a sentiment meter, clear/reset controls, instructions, and prediction history.

## Significant Improvements
1. Added rating stars so the score is easier to understand visually.
2. Added emoji category feedback so the result feels more like a mood forecast.
3. Added animated meter bar feedback to show the score moving from negative to positive.
4. Added example text buttons for positive, negative, neutral, and mixed sentences.
5. Added prediction history so the last five results can be compared.
6. Added clear/reset controls for the input, output, and history.
7. Added improved visual design and instructions to make the app feel more polished and beginner-friendly.

## What I Learned
I learned that the ml5.js sentiment model can connect machine learning to a browser page with only a small amount of code. The model returns a confidence score between 0 and 1, where values closer to 0 are more negative and values closer to 1 are more positive.

I also learned that confidence scores are easier to understand when they are translated into visual feedback. A number like 0.83 becomes clearer when it is shown as "Very Positive," five stars, a happy emoji, and a mostly full meter.

This project helped me practice DOM updates because the page changes many pieces of the interface after each prediction. The result text, raw score, percentage score, emoji, stars, meter, and history list all update with JavaScript.

I used conditionals to convert the score into categories. For example, scores from 0.41 to 0.60 become "Mixed / Neutral," while scores from 0.81 to 1.00 become "Very Positive."

I learned more about user interface design by making the app readable, colorful, responsive, and easy to test. The example buttons make the model easier to understand because users can quickly compare different types of text.

I also learned that the model has limitations. It was trained on movie reviews, so it does not truly understand feelings like a person. Short, sarcastic, vague, or non-review sentences may produce weird or surprising results.

## Model Limitations
The model was trained on movie reviews, so it may not interpret all kinds of text accurately. It predicts patterns from training data rather than truly understanding human emotion. This means the result should be treated as an estimate, not a perfect emotional reading.

## What I Would Improve Next
I would add `localStorage` so users can save their history after refreshing the page. I would also add a comparison feature so users can place two reviews side-by-side and see how their scores differ.