document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("powerSlider");
  const fillLevel = document.getElementById("fillLevel");

  const updateSliderVisuals = () => {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);

    // 1. Calculate the percentage for the blue fill height
    const percentage = ((val - min) / (max - min)) * 100;
    fillLevel.style.height = `${percentage}%`;
  };

  // Listen for the snap changes
  slider.addEventListener("input", updateSliderVisuals);

  // Initialize on load
  updateSliderVisuals();
});
