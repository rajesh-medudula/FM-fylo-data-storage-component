// config
const TOTAL_STORAGE = 1000;

// elements
const doneBtn = document.querySelector(".btn-done");
const closeBtn = document.querySelector(".btn-close");
const popup = document.querySelector(".pop-up-card");
const rangeInput = document.querySelector(".range-input");
const percentageDisplay = document.querySelector(".percentage-value");
const mainProgress = document.querySelector(".progress");
const storageLeft = document.querySelector(".storage-left");
const storageAvailable = document.querySelector(".storage-available");
const progressBar = document.querySelector(".bar");
const badgeInput = document.querySelector(".storage-left input");
const pageWrapper = document.querySelector(".page-wrapper");

// utility functions
function calculatePercentage(value, max) {
  return Math.round((value / max) * 100);
}

function openPopup() {
  popup.classList.add("active");
  document.body.classList.add("popup-open");
  pageWrapper.classList.add("blur");
}

function closePopup() {
  popup.classList.remove("active");
  document.body.classList.remove("popup-open");
  pageWrapper.classList.remove("blur");
}

function updateSliderUI() {
  if (!rangeInput) return;

  const value = Number(rangeInput.value);
  const max = Number(rangeInput.max);
  const percentage = calculatePercentage(value, max);

  rangeInput.style.setProperty("--progress", percentage + "%");

  if (percentageDisplay) {
    percentageDisplay.textContent = percentage + "%";
  }
}

function updateMainUI(usedValue, animate = true) {
  const percentage = calculatePercentage(usedValue, TOTAL_STORAGE);
  const remaining = TOTAL_STORAGE - usedValue;

  if (animate) {
    mainProgress.style.transition = "none";
    mainProgress.style.width = "0%";
    void mainProgress.offsetWidth;
    mainProgress.style.transition = "width 1s ease";
  }

  mainProgress.style.width = percentage + "%";

  if (badgeInput && window.innerWidth >= 1024) {
    badgeInput.value = remaining;
  } else {
    const numberSpan = storageLeft.querySelector("span");
    if (numberSpan) numberSpan.textContent = remaining;
  }

  storageAvailable.textContent = ` ${usedValue} `;
  localStorage.setItem("usedStorage", usedValue);
}

// slider events
if (rangeInput) {
  updateSliderUI();
  rangeInput.addEventListener("input", updateSliderUI);
}

// done button
if (doneBtn) {
  doneBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const usedValue = Number(rangeInput.value);
    closePopup();
    setTimeout(() => {
      updateMainUI(usedValue, true);
    }, 1000);
  });
}

// desktop input
if (badgeInput) {

  badgeInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (window.innerWidth < 1024) return;

    let remainingValue = Number(badgeInput.value);
    if (isNaN(remainingValue)) remainingValue = 0;
    remainingValue = Math.max(0, Math.min(TOTAL_STORAGE, remainingValue));

    const usedValue = TOTAL_STORAGE - remainingValue;

    setTimeout(() => {
      updateMainUI(usedValue, true);
      rangeInput.value = usedValue;
      updateSliderUI();
      badgeInput.value = remainingValue;
      autoResizeInput();
    }, 1000);
  });

  badgeInput.addEventListener("input", () => {
    badgeInput.value = badgeInput.value.replace(/\D/g, "");
    let value = Number(badgeInput.value);
    if (value > TOTAL_STORAGE) value = TOTAL_STORAGE;
    if (value < 0) value = 0;
    badgeInput.value = value;
    autoResizeInput();
  });
}

// input resize
function autoResizeInput() {
  if (!badgeInput) return;
  const length = badgeInput.value.length || 1;
  badgeInput.style.width = (length + 0.1) + "ch";
}

// popup control
if (progressBar) {
  progressBar.addEventListener("click", (e) => {
    e.stopPropagation();
    openPopup();
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closePopup();
  });
}

if (popup) {
  popup.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

document.addEventListener("click", () => {
  if (popup && popup.classList.contains("active")) {
    closePopup();
  }
});

// restore saved data + initial setup
window.addEventListener("DOMContentLoaded", () => {

  autoResizeInput();

  const savedValue = localStorage.getItem("usedStorage");

  if (savedValue !== null) {
    const usedValue = Number(savedValue);

    updateMainUI(usedValue, false);
    rangeInput.value = usedValue;
    updateSliderUI();

    const remaining = TOTAL_STORAGE - usedValue;

    if (badgeInput) {
      badgeInput.value = remaining;
      autoResizeInput();
    }
  } else {

    if (badgeInput) {
      badgeInput.value = TOTAL_STORAGE;
      autoResizeInput();
    }

    if (rangeInput) {
      rangeInput.value = 0;
      updateSliderUI();
    }
  }

  // mobile tip popup (below 1024px)
const tipPopup = document.querySelector(".pop-up-tip");
const tipBtn = tipPopup ? tipPopup.querySelector("button") : null;

if (tipPopup && window.innerWidth < 1024) {
  setTimeout(() => {
    tipPopup.classList.add("active");
    document.body.classList.add("popup-open");
    pageWrapper.classList.add("blur");
  }, 2000);
}

if (tipBtn) {
  tipBtn.addEventListener("click", () => {
    tipPopup.classList.remove("active");
    document.body.classList.remove("popup-open");
    pageWrapper.classList.remove("blur");
  });
}

const tooltip = document.querySelector(".tooltip");

if (tooltip && window.innerWidth >= 1024) {

  // show after 2 seconds
  setTimeout(() => {
    tooltip.classList.add("active");

    // hide after 5 seconds
    setTimeout(() => {
      tooltip.classList.remove("active");
    }, 5000);

  }, 2000);
}
});

// breakpoint reinitializer
const desktopQuery = window.matchMedia("(min-width: 1024px)");

desktopQuery.addEventListener("change", () => {

  const savedValue = localStorage.getItem("usedStorage");
  if (savedValue === null) return;

  const usedValue = Number(savedValue);

  updateMainUI(usedValue, false);
  rangeInput.value = usedValue;
  updateSliderUI();

  if (badgeInput) {
    const remaining = TOTAL_STORAGE - usedValue;
    badgeInput.value = remaining;
    autoResizeInput();
  }
});