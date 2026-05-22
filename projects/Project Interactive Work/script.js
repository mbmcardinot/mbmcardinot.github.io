"use strict";

// ===============================
// Smooth navigation
// ===============================

const navLinks = document.querySelectorAll(".nav-links a, .brand, .primary-button");
const sectionLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    event.preventDefault();
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", targetId);
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = "#" + entry.target.id;

          sectionLinks.forEach((link) => {
            link.classList.toggle("is-current", link.getAttribute("href") === activeId);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
  );

  document.querySelectorAll("main section[id]").forEach((section) => {
    observer.observe(section);
  });
}

// ===============================
// Tuition chart
// ===============================

const tuitionData = {
  years: [1990, 2000, 2010, 2020, 2025],
  public: [1908, 3501, 6416, 9375, 11100],
  private: [9634, 16437, 27798, 32900, 43700]
};

const growthRateInput = document.getElementById("growthRate");
const growthLabel = document.getElementById("growthLabel");
const chartCanvas = document.getElementById("tuitionChart");
const chartFallback = document.getElementById("chartFallback");
const public2035 = document.getElementById("public2035");
const private2035 = document.getElementById("private2035");

let tuitionChart = null;

function buildTuitionChart() {
  if (!growthRateInput) {
    return;
  }

  const projectedData = getProjectedTuitionData(Number(growthRateInput.value));
  growthLabel.textContent = formatPercent(growthRateInput.value);
  public2035.textContent = formatMoney(projectedData.public[projectedData.public.length - 1]);
  private2035.textContent = formatMoney(projectedData.private[projectedData.private.length - 1]);

  if (typeof Chart === "undefined" || !chartCanvas) {
    if (chartFallback) {
      chartFallback.hidden = false;
    }
    return;
  }

  if (!tuitionChart) {
    tuitionChart = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: projectedData.years,
        datasets: [
          {
            label: "Public tuition",
            data: projectedData.public,
            borderColor: "#2f80ed",
            backgroundColor: "rgba(47, 128, 237, 0.16)",
            pointBackgroundColor: "#2f80ed",
            pointRadius: 4,
            tension: 0.32,
            fill: true,
            segment: {
              borderDash: (context) => context.p0DataIndex >= tuitionData.years.length - 1 ? [7, 5] : undefined
            }
          },
          {
            label: "Private tuition",
            data: projectedData.private,
            borderColor: "#ff6b6b",
            backgroundColor: "rgba(255, 107, 107, 0.14)",
            pointBackgroundColor: "#ff6b6b",
            pointRadius: 4,
            tension: 0.32,
            fill: true,
            segment: {
              borderDash: (context) => context.p0DataIndex >= tuitionData.years.length - 1 ? [7, 5] : undefined
            }
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "index"
        },
        plugins: {
          legend: {
            labels: {
              color: "#101828",
              font: {
                weight: "bold"
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => context.dataset.label + ": " + formatMoney(context.parsed.y)
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "#556070"
            },
            grid: {
              color: "rgba(85, 96, 112, 0.16)"
            }
          },
          y: {
            ticks: {
              color: "#556070",
              callback: (value) => formatMoney(value)
            },
            grid: {
              color: "rgba(85, 96, 112, 0.16)"
            }
          }
        }
      }
    });
    return;
  }

  tuitionChart.data.labels = projectedData.years;
  tuitionChart.data.datasets[0].data = projectedData.public;
  tuitionChart.data.datasets[1].data = projectedData.private;
  tuitionChart.update();
}

if (growthRateInput) {
  growthRateInput.addEventListener("input", buildTuitionChart);
  buildTuitionChart();
}

// ===============================
// Tuition projection logic
// ===============================

function getProjectedTuitionData(growthRate) {
  return {
    years: [...tuitionData.years, 2030, 2035],
    public: calculateProjection(tuitionData.public, growthRate),
    private: calculateProjection(tuitionData.private, growthRate)
  };
}

function calculateProjection(values, growthRate) {
  const projectedValues = [...values];
  let currentValue = values[values.length - 1];

  currentValue = currentValue * Math.pow(1 + growthRate / 100, 5);
  projectedValues.push(Math.round(currentValue));

  currentValue = currentValue * Math.pow(1 + growthRate / 100, 5);
  projectedValues.push(Math.round(currentValue));

  return projectedValues;
}

// ===============================
// Debt calculator
// ===============================

const tuitionInput = document.getElementById("tuitionInput");
const yearsInput = document.getElementById("yearsInput");
const aidInput = document.getElementById("aidInput");
const livingInput = document.getElementById("livingInput");
const costResult = document.getElementById("costResult");
const costMessage = document.getElementById("costMessage");
const validationNote = document.getElementById("validationNote");

const calculatorInputs = [tuitionInput, yearsInput, aidInput, livingInput].filter(Boolean);

function calculateDebt() {
  if (!tuitionInput || !yearsInput || !aidInput || !livingInput || !costResult || !costMessage) {
    return;
  }

  const tuition = readNumber(tuitionInput, 0);
  const years = readNumber(yearsInput, 1);
  const aid = readNumber(aidInput, 0);
  const living = readNumber(livingInput, 0);
  const hasInvalidInputs = calculatorInputs.some((input) => input.classList.contains("is-invalid"));

  const yearlyCost = Math.max(0, tuition + living - aid);
  const total = yearlyCost * years;

  costResult.textContent = formatMoney(total);
  costMessage.textContent = getDebtMessage(total);

  if (validationNote) {
    validationNote.textContent = hasInvalidInputs ? "Negative or blank values are treated as the minimum allowed amount." : "";
  }
}

calculatorInputs.forEach((input) => {
  input.addEventListener("input", calculateDebt);
});

calculateDebt();

// ===============================
// Expandable student stories
// ===============================

const storyButtons = document.querySelectorAll(".story-toggle");

storyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const detailId = button.getAttribute("aria-controls");
    const detailPanel = document.getElementById(detailId);

    if (!detailPanel) {
      return;
    }

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.textContent = isExpanded ? "Show details" : "Hide details";
    detailPanel.hidden = isExpanded;
  });
});

// ===============================
// Utility formatting functions
// ===============================

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatPercent(value) {
  return Number(value).toFixed(Number(value) % 1 === 0 ? 0 : 1) + "%";
}

function readNumber(input, minimum) {
  const value = Number(input.value);
  const isValid = input.value !== "" && !Number.isNaN(value) && value >= minimum;

  input.classList.toggle("is-invalid", !isValid);
  input.setAttribute("aria-invalid", String(!isValid));

  if (!isValid) {
    return minimum;
  }

  return value;
}

function getDebtMessage(total) {
  if (total < 20000) {
    return "Lower debt range, but still worth planning carefully.";
  }

  if (total <= 60000) {
    return "Moderate debt range. Compare aid options and repayment plans.";
  }

  return "High debt range. Explore scholarships, community college transfer paths, and lower-cost options.";
}
