let sentiment;
let modelReady = false;
let currentText = "";
let predictionHistory = [];

let inputBox;
let analyzeBtn;
let clearBtn;
let clearHistoryBtn;
let modelStatus;
let categoryLabel;
let scoreLabel;
let rawScoreLabel;
let emojiDisplay;
let starsDisplay;
let meterFill;
let meterText;
let historyList;

function preload() {
  // Initialize the same MovieReviews sentiment model used in the tutorial.
  sentiment = ml5.sentiment("MovieReviews");
}

function setup() {
  noCanvas();

  // Connect JavaScript variables to the HTML elements.
  inputBox = document.querySelector("#sentimentInput");
  analyzeBtn = document.querySelector("#analyzeBtn");
  clearBtn = document.querySelector("#clearBtn");
  clearHistoryBtn = document.querySelector("#clearHistoryBtn");
  modelStatus = document.querySelector("#modelStatus");
  categoryLabel = document.querySelector("#categoryLabel");
  scoreLabel = document.querySelector("#scoreLabel");
  rawScoreLabel = document.querySelector("#rawScoreLabel");
  emojiDisplay = document.querySelector("#emojiDisplay");
  starsDisplay = document.querySelector("#starsDisplay");
  meterFill = document.querySelector("#meterFill");
  meterText = document.querySelector("#meterText");
  historyList = document.querySelector("#historyList");

  modelReady = true;
  modelStatus.textContent = "Model ready.";
  modelStatus.classList.add("is-ready");

  analyzeBtn.addEventListener("click", getSentiment);
  clearBtn.addEventListener("click", clearInputAndResult);
  clearHistoryBtn.addEventListener("click", clearHistory);

  inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      getSentiment();
    }
  });

  document.querySelectorAll(".example-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      inputBox.value = button.dataset.example;
      getSentiment();
    });
  });

  updateVisualUI(0, "No result yet.", "🌫️", 0);
}

function getSentiment() {
  let text = inputBox.value.trim();

  if (text.length === 0) {
    showMessage("Please type something first.");
    return;
  }

  if (!modelReady) {
    showMessage("Model is still loading. Please try again in a moment.");
    return;
  }

  currentText = text;
  categoryLabel.textContent = "Analyzing...";

  // Start making the prediction.
  sentiment.predict(text, gotResult);
}

function gotResult(prediction) {
  let score = prediction.confidence;
  let percentage = Math.round(score * 100);
  let category = getCategory(score);
  let emoji = getEmoji(score);
  let starCount = getStarCount(score);

  scoreLabel.textContent = "Score: " + percentage + "%";
  rawScoreLabel.textContent = "Raw confidence: " + score.toFixed(4);
  updateVisualUI(percentage, category, emoji, starCount);
  addToHistory(currentText, percentage, category);
}

function getCategory(score) {
  if (score <= 0.20) return "Very Negative";
  if (score <= 0.40) return "Somewhat Negative";
  if (score <= 0.60) return "Mixed / Neutral";
  if (score <= 0.80) return "Somewhat Positive";
  return "Very Positive";
}

function getEmoji(score) {
  if (score <= 0.20) return "😭";
  if (score <= 0.40) return "🙁";
  if (score <= 0.60) return "😐";
  if (score <= 0.80) return "🙂";
  return "😄";
}

function getStarCount(score) {
  if (score <= 0.20) return 1;
  if (score <= 0.40) return 2;
  if (score <= 0.60) return 3;
  if (score <= 0.80) return 4;
  return 5;
}

function makeStars(count) {
  return "★".repeat(count) + "☆".repeat(5 - count);
}

function updateVisualUI(percentage, category, emoji, starCount) {
  categoryLabel.textContent = category;
  emojiDisplay.textContent = emoji;
  starsDisplay.textContent = makeStars(starCount);
  starsDisplay.setAttribute("aria-label", starCount + " out of 5 stars");
  meterFill.style.width = percentage + "%";
  meterText.textContent = "Meter: " + percentage + "%";
}

function addToHistory(text, percentage, category) {
  predictionHistory.unshift({
    text: text,
    percentage: percentage,
    category: category
  });

  predictionHistory = predictionHistory.slice(0, 5);
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";

  if (predictionHistory.length === 0) {
    let emptyItem = document.createElement("li");
    emptyItem.className = "empty-history";
    emptyItem.textContent = "No predictions yet.";
    historyList.appendChild(emptyItem);
    return;
  }

  predictionHistory.forEach(function (item) {
    let listItem = document.createElement("li");
    let excerpt = document.createElement("span");
    let details = document.createElement("strong");

    excerpt.textContent = shortenText(item.text);
    details.textContent = item.percentage + "% · " + item.category;

    listItem.appendChild(excerpt);
    listItem.appendChild(details);
    historyList.appendChild(listItem);
  });
}

function shortenText(text) {
  if (text.length <= 55) {
    return text;
  }

  return text.slice(0, 52) + "...";
}

function showMessage(message) {
  categoryLabel.textContent = message;
  scoreLabel.textContent = "Score: --";
  rawScoreLabel.textContent = "Raw confidence: --";
  updateVisualUI(0, message, "🌫️", 0);
}

function clearInputAndResult() {
  inputBox.value = "";
  currentText = "";
  scoreLabel.textContent = "Score: --";
  rawScoreLabel.textContent = "Raw confidence: --";
  updateVisualUI(0, "No result yet.", "🌫️", 0);
  inputBox.focus();
}

function clearHistory() {
  predictionHistory = [];
  renderHistory();
}
