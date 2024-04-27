// Initialize Tone.js
const synth = new Tone.Synth().toDestination();

// Function to play a note
function playNote(note) {
  const frequency = Tone.Frequency(note).toFrequency();
  document.getElementById("frequencySlider").value = frequency.toFixed(2);
  synth.triggerAttackRelease(frequency, "8n");
  document.getElementById("wavelength").value = frequency.toFixed(2);
}

// Event listeners for each button
document.getElementById("playC").addEventListener("click", function() {
  playNote("C4");
});

document.getElementById("playG").addEventListener("click", function() {
  playNote("G4");
});

document.getElementById("playA").addEventListener("click", function() {
  playNote("A4");
});

// Function to play a custom frequency
function playCustomFrequency() {
  const customFrequency = parseFloat(document.getElementById("customFrequency").value);
  if (!isNaN(customFrequency)) {
    synth.triggerAttackRelease(customFrequency, "8n");
    document.getElementById("wavelength").value = customFrequency.toFixed(2);
  } else {
    alert("Please enter a valid frequency.");
  }
}

// Function to update custom frequency based on slider value
function updateCustomFrequencyFromSlider() {
  const sliderValue = parseFloat(document.getElementById("frequencySlider").value);
  document.getElementById("customFrequency").value = sliderValue.toFixed(2);
  const playOnSliderChange = document.getElementById("playOnSliderChange").checked;
  if (playOnSliderChange) {
    playCustomFrequency();
  }
}

// Event listener for frequency slider
document.getElementById("frequencySlider").addEventListener("input", updateCustomFrequencyFromSlider);

// Event listener for custom button
document.getElementById("playCustom").addEventListener("click", playCustomFrequency);
