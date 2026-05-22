// =====================
// DOM Element Selections
// =====================

const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("imageInput");
const previewImage = document.getElementById("preview");
const previewCard = document.getElementById("previewCard");
const fileName = document.getElementById("fileName");
const result = document.getElementById("result");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const predictionsList = document.getElementById("predictionsList");
const emptyState = document.getElementById("emptyState");
const analyzeButton = document.getElementById("analyzeButton");
const resetButton = document.getElementById("resetButton");

let model = null;
let isModelLoading = true;
let currentObjectUrl = null;

// =====================
// Model Loading
// =====================

async function loadModelWithProgress() {
  isModelLoading = true;
  setStatus("Loading model...", "working");
  startFakeProgress();

  try {
    model = await mobilenet.load();
    finishFakeProgress();
    isModelLoading = false;

    setTimeout(() => {
      hideProgress();
      setStatus("Model ready — drop or choose an image.", "ready");

      if (previewImage.src && previewImage.complete) {
        analyzeImage();
      }
    }, 400);
  } catch (error) {
    console.error("MobileNet failed to load:", error);
    isModelLoading = false;
    hideProgress();
    setStatus("Model could not load. Check your internet connection and refresh the page.", "error");
  }
}

window.addEventListener("DOMContentLoaded", loadModelWithProgress);

// =====================
// Progress Bar Logic
// =====================

let progressTimer = null;

function startFakeProgress() {
  let progress = 0;

  progressContainer.style.display = "block";
  progressBar.style.width = "0%";

  progressTimer = setInterval(() => {
    progress += Math.random() * 12 + 4;

    if (progress > 90) {
      progress = 90;
    }

    progressBar.style.width = progress + "%";
  }, 220);
}

function finishFakeProgress() {
  clearInterval(progressTimer);
  progressTimer = null;
  progressBar.style.width = "100%";
}

function hideProgress() {
  clearInterval(progressTimer);
  progressTimer = null;
  progressContainer.style.display = "none";
}

// =====================
// Image File Validation
// =====================

function isValidImageFile(file) {
  return file && file.type.startsWith("image/");
}

function handleFile(file) {
  if (!file) {
    return;
  }

  if (!isValidImageFile(file)) {
    fileInput.value = "";
    setStatus("Please choose an image file.", "error");
    return;
  }

  loadImageFromFile(file);
}

// =====================
// Image Preview Loading
// =====================

function loadImageFromFile(file) {
  clearPredictions();
  revokeCurrentObjectUrl();

  currentObjectUrl = URL.createObjectURL(file);
  previewImage.src = currentObjectUrl;
  previewImage.alt = "Selected image preview for " + file.name;
  fileName.textContent = file.name;
  previewCard.classList.remove("is-hidden");

  setStatus("Image loaded. Preparing analysis...", "working");

  previewImage.onload = () => analyzeImage();

  previewImage.onerror = () => {
    setStatus("Please choose an image file.", "error");
    resetPreviewOnly();
  };
}

// =====================
// Image Analysis
// =====================

async function analyzeImage() {
  if (isModelLoading || !model) {
    setStatus("Model is still loading...", "working");
    return;
  }

  if (!previewImage.src) {
    setStatus("Please load an image first.", "error");
    return;
  }

  setStatus("Analyzing...", "working");
  clearPredictions();

  try {
    const predictions = await model.classify(previewImage, 5);
    renderPredictions(predictions);
  } catch (error) {
    console.error("Image classification failed:", error);
    clearPredictions();
    setStatus("Something went wrong while analyzing the image.", "error");
  }
}

// =====================
// Prediction Rendering
// =====================

function renderPredictions(predictions) {
  predictionsList.innerHTML = "";

  if (!predictions || predictions.length === 0) {
    setStatus("Could not determine the subject.", "error");
    emptyState.textContent = "Could not determine the subject.";
    emptyState.classList.remove("is-hidden");
    return;
  }

  const top = predictions[0];
  const topPercent = (top.probability * 100).toFixed(1) + "%";

  setStatus("Top subject: " + top.className + " (" + topPercent + ")", "ready");
  emptyState.classList.add("is-hidden");

  predictions.slice(0, 5).forEach((prediction, index) => {
    const percent = (prediction.probability * 100).toFixed(1) + "%";
    const item = document.createElement("li");
    const header = document.createElement("div");
    const label = document.createElement("span");
    const score = document.createElement("strong");
    const bar = document.createElement("div");
    const fill = document.createElement("div");

    item.className = "prediction-item";
    if (index === 0) {
      item.classList.add("top-prediction");
    }

    header.className = "prediction-header";
    label.className = "prediction-label";
    score.className = "prediction-percent";
    bar.className = "confidence-bar";
    fill.className = "confidence-fill";

    label.textContent = prediction.className;
    score.textContent = percent;
    fill.style.width = percent;

    header.append(label, score);
    bar.appendChild(fill);
    item.append(header, bar);
    predictionsList.appendChild(item);
  });
}

function clearPredictions() {
  predictionsList.innerHTML = "";
  emptyState.textContent = "Results will appear here after you upload an image.";
  emptyState.classList.remove("is-hidden");
}

// =====================
// Drag-and-Drop Event Handling
// =====================

dropzone.addEventListener("click", () => fileInput.click());

dropzone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    fileInput.click();
  }
});

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropzone.classList.add("hover");
});

dropzone.addEventListener("dragenter", (event) => {
  event.preventDefault();
  dropzone.classList.add("hover");
});

dropzone.addEventListener("dragleave", (event) => {
  if (!dropzone.contains(event.relatedTarget)) {
    dropzone.classList.remove("hover");
  }
});

dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropzone.classList.remove("hover");

  const file = event.dataTransfer.files[0];
  handleFile(file);
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  handleFile(file);
});

// =====================
// Reset Logic
// =====================

analyzeButton.addEventListener("click", analyzeImage);
resetButton.addEventListener("click", resetApp);

function resetApp() {
  resetPreviewOnly();
  clearPredictions();
  fileInput.value = "";

  if (model) {
    setStatus("Model ready — drop or choose an image.", "ready");
  } else {
    setStatus("Loading model...", "working");
  }
}

function resetPreviewOnly() {
  revokeCurrentObjectUrl();
  previewImage.removeAttribute("src");
  previewImage.alt = "Selected image preview";
  fileName.textContent = "";
  previewCard.classList.add("is-hidden");
}

// =====================
// Helper Functions
// =====================

function setStatus(message, type) {
  result.textContent = message;
  result.className = "status-text";

  if (type) {
    result.classList.add(type);
  }
}

function revokeCurrentObjectUrl() {
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
}
