// Select all of the navigation buttons and page sections.
const buttons = document.querySelectorAll("nav button");
const pages = document.querySelectorAll(".page");

// Select the extra interactive elements on the page.
const themeToggle = document.querySelector("#theme-toggle");
const promptButton = document.querySelector("#prompt-button");
const promptOutput = document.querySelector("#prompt-output");
const filterButtons = document.querySelectorAll(".filter-controls button");
const galleryCards = document.querySelectorAll(".gallery-card");

// These keys are used to save choices in the browser.
const themeStorageKey = "creativeCodingTheme";
const pageStorageKey = "creativeCodingLastPage";

// These prompts are used by the random creative prompt button.
const creativePrompts = [
  "Design a character based on a weather pattern.",
  "Animate a bouncing object with personality.",
  "Turn a data set into a monster design.",
  "Create a UI screen for a magical inventory.",
  "Build a tiny world using only circles and squares.",
  "Make a color palette for a mysterious underwater level.",
  "Create a button that feels like it belongs in a fantasy game.",
  "Sketch an enemy movement pattern with simple shapes."
];

// This function shows one page and hides the others.
function showPage(pageName) {
  buttons.forEach(button => {
    button.classList.remove("active");

    if (button.dataset.page === pageName) {
      button.classList.add("active");
    }
  });

  pages.forEach(page => {
    page.classList.toggle("active", page.id === pageName);
  });

  localStorage.setItem(pageStorageKey, pageName);
}

// Add a click event listener to each navigation button.
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedPage = button.dataset.page;
    showPage(selectedPage);
  });
});

// This function changes the theme button text to match the current mode.
function updateThemeButton() {
  const isLightTheme = document.body.classList.contains("light-theme");
  themeToggle.textContent = isLightTheme ? "Dark Mode" : "Light Mode";
  themeToggle.setAttribute("aria-pressed", isLightTheme);
}

// Load the saved theme when the page opens.
const savedTheme = localStorage.getItem(themeStorageKey);

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

updateThemeButton();

// Toggle between dark and light themes when the theme button is clicked.
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLightTheme = document.body.classList.contains("light-theme");
  const themeName = isLightTheme ? "light" : "dark";

  localStorage.setItem(themeStorageKey, themeName);
  updateThemeButton();
});

// Show a random creative prompt on the Home page.
promptButton.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * creativePrompts.length);
  promptOutput.textContent = creativePrompts[randomIndex];
});

// Add a simple category filter for the gallery cards.
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach(filterButton => {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");

    galleryCards.forEach(card => {
      const cardCategory = card.dataset.category;
      const shouldShowCard = selectedFilter === "all" || cardCategory === selectedFilter;

      card.classList.toggle("is-hidden", !shouldShowCard);
    });
  });
});

// Open the last visited section when the page loads.
const savedPage = localStorage.getItem(pageStorageKey);
const pageIds = Array.from(pages).map(page => page.id);

if (pageIds.includes(savedPage)) {
  showPage(savedPage);
} else {
  showPage("home");
}
