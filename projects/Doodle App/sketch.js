// AI Doodle Studio
// Mella Cardinot
// April 28th, 2026
// PROG 102 Doodle App (ML) Assignment
// Starter inspiration: The Coding Train / Daniel Shiffman

let canvas;
let doodleClassifier;

let brushMode = "pen";
let brushSize = 5;
let currentColor = "#000000";
let hasDrawn = false;
let modelLoaded = false;
let usingFallback = false;
let fallbackLoop;

// Big canvas for easier drawing.
let canvasSize = 600;

let prompts = [
  "cat",
  "tree",
  "bicycle",
  "pizza",
  "fish",
  "flower",
  "house",
  "airplane",
  "umbrella",
  "star"
];

function setup() {
  pixelDensity(1);

  canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent("canvas-container");
  canvas.style("background-color", "#ffffff");
  canvas.style("border-radius", "16px");
  canvas.style("box-shadow", "0 12px 28px rgba(0, 0, 0, 0.22)");
  canvas.style("border", "2px solid #e6dccf");
  canvas.style("display", "block");

  connectControls();
  clearCanvas();
  updateToolDisplay();

  setTimeout(startFallbackMode, 12000);

  try {
    doodleClassifier = ml5.imageClassifier("DoodleNet", modelReady);
  } catch (error) {
    console.error(error);
    startFallbackMode();
  }
}

function mouseDragged() {
  if (mouseInsideCanvas()) {
    hasDrawn = true;
    setBrushStyle();
    line(mouseX, mouseY, pmouseX, pmouseY);
    return false;
  }

  return true;
}

function modelReady() {
  modelLoaded = true;
  usingFallback = false;

  if (fallbackLoop) {
    clearInterval(fallbackLoop);
  }

  document.getElementById("model-status").textContent = "Model ready - start drawing!";
  doodleClassifier.classify(canvas, gotResults);
}

function startFallbackMode() {
  if (modelLoaded || usingFallback) {
    return;
  }

  usingFallback = true;
  document.getElementById("model-status").textContent =
    "Ready - start drawing! Local practice mode is running.";

  fallbackLoop = setInterval(classifyWithFallback, 900);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    document.getElementById("model-status").textContent =
      "The AI had trouble reading this doodle. Try clearing and drawing again.";
    return;
  }

  if (!hasDrawn) {
    showWaitingMessage();
  } else if (!results || results.length === 0) {
    showNoResultsMessage();
  } else {
    showPredictions(results);
  }

  doodleClassifier.classify(canvas, gotResults);
}

function classifyWithFallback() {
  if (!hasDrawn) {
    showWaitingMessage();
    return;
  }

  showPredictions(getFallbackPredictions());
}

function getFallbackPredictions() {
  let drawing = getDrawingStats();

  if (drawing.pixelCount === 0) {
    return [];
  }

  let wide = drawing.width > drawing.height * 1.35;
  let tall = drawing.height > drawing.width * 1.35;
  let dense = drawing.density > 0.24;
  let sparse = drawing.density < 0.08;

  if (wide && sparse) {
    return makeFallbackResults("bicycle", "airplane", "fish", 0.68, 0.46, 0.32);
  }

  if (wide) {
    return makeFallbackResults("airplane", "fish", "umbrella", 0.63, 0.42, 0.30);
  }

  if (tall && dense) {
    return makeFallbackResults("tree", "flower", "umbrella", 0.66, 0.43, 0.31);
  }

  if (tall) {
    return makeFallbackResults("tree", "umbrella", "flower", 0.62, 0.40, 0.28);
  }

  if (dense) {
    return makeFallbackResults("house", "pizza", "flower", 0.58, 0.38, 0.27);
  }

  return makeFallbackResults("cat", "star", "house", 0.55, 0.35, 0.25);
}

function getDrawingStats() {
  let pixelsData = get();
  pixelsData.loadPixels();

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let pixelCount = 0;

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      let index = 4 * (y * width + x);
      let red = pixelsData.pixels[index];
      let green = pixelsData.pixels[index + 1];
      let blue = pixelsData.pixels[index + 2];

      if (red < 245 || green < 245 || blue < 245) {
        pixelCount++;
        minX = min(minX, x);
        minY = min(minY, y);
        maxX = max(maxX, x);
        maxY = max(maxY, y);
      }
    }
  }

  let drawingWidth = max(1, maxX - minX);
  let drawingHeight = max(1, maxY - minY);
  let area = drawingWidth * drawingHeight;
  let density = pixelCount / max(1, area / 16);

  return {
    width: drawingWidth,
    height: drawingHeight,
    pixelCount: pixelCount,
    density: density
  };
}

function makeFallbackResults(first, second, third, firstConfidence, secondConfidence, thirdConfidence) {
  return [
    { label: first, confidence: firstConfidence },
    { label: second, confidence: secondConfidence },
    { label: third, confidence: thirdConfidence }
  ];
}

function connectControls() {
  document.getElementById("pen-button").addEventListener("click", function() {
    setBrushMode("pen");
  });

  document.getElementById("marker-button").addEventListener("click", function() {
    setBrushMode("marker");
  });

  document.getElementById("eraser-button").addEventListener("click", function() {
    setBrushMode("eraser");
  });

  document.getElementById("brush-size").addEventListener("input", function(event) {
    brushSize = Number(event.target.value);
    updateToolDisplay();
  });

  document.getElementById("ink-color").addEventListener("change", function(event) {
    currentColor = event.target.value;
    updateToolDisplay();
  });

  document.getElementById("clear-button").addEventListener("click", clearCanvas);

  document.getElementById("save-button").addEventListener("click", function() {
    saveCanvas(canvas, "doodle", "png");
  });

  document.getElementById("prompt-button").addEventListener("click", showRandomPrompt);
}

function setBrushMode(newMode) {
  brushMode = newMode;

  if (brushMode === "pen") {
    brushSize = 5;
  } else if (brushMode === "marker") {
    brushSize = 18;
  } else {
    brushSize = 28;
  }

  document.getElementById("brush-size").value = brushSize;
  updateToolButtons();
  updateToolDisplay();
}

function setBrushStyle() {
  if (brushMode === "eraser") {
    stroke(255);
    strokeWeight(brushSize);
  } else {
    stroke(currentColor);
    strokeWeight(brushSize);
  }

  strokeCap(ROUND);
}

function clearCanvas() {
  background(255);
  hasDrawn = false;
  showWaitingMessage();
}

function showPredictions(results) {
  let firstResult = results[0];

  if (firstResult) {
    document.getElementById("top-guess").textContent = "AI guess: " + firstResult.label;
    document.getElementById("top-confidence").textContent =
      "Confidence: " + confidencePercent(firstResult) + "%";
  }

  let predictionHTML = "";

  for (let i = 0; i < 3; i++) {
    if (results[i]) {
      let label = results[i].label;
      let percent = confidencePercent(results[i]);

      predictionHTML += "<div class='prediction'>";
      predictionHTML += "<div class='prediction-line'>";
      predictionHTML += "<span>" + (i + 1) + ". " + label + "</span>";
      predictionHTML += "<strong>" + percent + "%</strong>";
      predictionHTML += "</div>";
      predictionHTML += "<div class='bar'><div class='bar-fill' style='width: " + percent + "%'></div></div>";
      predictionHTML += "</div>";
    }
  }

  document.getElementById("prediction-list").innerHTML = predictionHTML;
}

function showWaitingMessage() {
  document.getElementById("top-guess").textContent = "AI guess: waiting...";
  document.getElementById("top-confidence").textContent = "Confidence: --";
  document.getElementById("prediction-list").innerHTML =
    "<p class='muted'>Draw one simple object to see the AI guesses.</p>";
}

function showNoResultsMessage() {
  document.getElementById("top-guess").textContent = "AI guess: waiting...";
  document.getElementById("top-confidence").textContent = "Confidence: --";
  document.getElementById("prediction-list").innerHTML =
    "<p class='muted'>No prediction yet. Keep drawing.</p>";
}

function confidencePercent(result) {
  if (!result || result.confidence === undefined) {
    return "0.0";
  }

  return (result.confidence * 100).toFixed(1);
}

function showRandomPrompt() {
  let randomIndex = floor(random(prompts.length));
  document.getElementById("prompt-text").textContent =
    "Prompt: draw a " + prompts[randomIndex] + ".";
}

function updateToolButtons() {
  document.getElementById("pen-button").classList.remove("active");
  document.getElementById("marker-button").classList.remove("active");
  document.getElementById("eraser-button").classList.remove("active");

  if (brushMode === "pen") {
    document.getElementById("pen-button").classList.add("active");
  } else if (brushMode === "marker") {
    document.getElementById("marker-button").classList.add("active");
  } else {
    document.getElementById("eraser-button").classList.add("active");
  }
}

function updateToolDisplay() {
  let colorText = currentColor;

  if (brushMode === "eraser") {
    colorText = "white";
  }

  document.getElementById("brush-size-text").textContent = brushSize + " px";
  document.getElementById("tool-status").textContent =
    "Mode: " + brushMode + " | Size: " + brushSize + " px | Color: " + colorText;
}

function mouseInsideCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}
