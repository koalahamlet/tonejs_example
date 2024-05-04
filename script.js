// Initialize Tone.js
const synth = new Tone.PolySynth().toDestination();

let lastPlayedButtons = {}; // Object to keep track of last played buttons

// Function to play a note
function playNoteAndHighlightButton(button) {
  const note = button.innerText;
  synth.triggerAttack(note);
  // Update lastPlayedButtons object
  lastPlayedButtons[note] = button;
  button.style.backgroundColor = '#ff69b4'; // Pink
  // Update wavelength box with frequency of the note
  document.getElementById("wavelength").value = Tone.Frequency(note).toFrequency().toFixed(2);
}

// Function to release a note
function releaseNoteAndRemoveHighlight(button) {
  const note = button.innerText;
  synth.triggerRelease(note);
  // Update lastPlayedButtons object
  delete lastPlayedButtons[note];
  button.style.backgroundColor = ''; // Reset button color
}

// Event listener for each piano key
document.querySelectorAll('.note-button').forEach(button => {
  button.addEventListener('mousedown', () => {
    playNoteAndHighlightButton(button);
  });
  button.addEventListener('mouseup', () => {
    releaseNoteAndRemoveHighlight(button);
  });
  button.addEventListener('mouseleave', () => {
    releaseNoteAndRemoveHighlight(button);
  });
});

// Event listener for custom button
document.getElementById("playCustom").addEventListener("click", function() {
  const customFrequency = parseFloat(document.getElementById("customFrequency").value);
  if (!isNaN(customFrequency)) {
    // Stop all currently playing notes
    Object.keys(lastPlayedButtons).forEach(note => {
      synth.triggerRelease(note);
      lastPlayedButtons[note].style.backgroundColor = ''; // Reset button color
    });
    lastPlayedButtons = {}; // Clear lastPlayedButtons object
    // Trigger custom frequency
    synth.triggerAttackRelease(customFrequency, "8n");
    document.getElementById("wavelength").value = customFrequency.toFixed(2);
  } else {
    alert("Please enter a valid frequency.");
  }
});

// Function to handle slider change
function handleSliderChange() {
  const customFrequency = parseFloat(document.getElementById("frequencySlider").value);
  document.getElementById("customFrequency").value = customFrequency.toFixed(2);
  const playOnSliderChange = document.getElementById("playOnSliderChange").checked;
  if (playOnSliderChange) {
    synth.triggerRelease(); // Stop any currently playing notes
    synth.triggerAttackRelease(customFrequency, "8n");
    document.getElementById("wavelength").value = customFrequency.toFixed(2);
  }
}

// Event listener for slider change
document.getElementById("frequencySlider").addEventListener("input", handleSliderChange);

// Function to handle keydown events
function handleKeyDown(event) {
  const key = event.key.toUpperCase();
  const whiteKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I']; // White keys
  const blackKeys = ['2', '3', '5', '6', '7']; // Black keys
  let noteIndex = whiteKeys.indexOf(key);
  let buttons;

  if (noteIndex === -1) {
    noteIndex = blackKeys.indexOf(key);
    buttons = document.querySelectorAll('.black-key'); // Select only black keys
  } else {
    buttons = document.querySelectorAll('.white-key'); // Select only white keys
  }

  if (noteIndex !== -1) {
    if (noteIndex >= 0 && noteIndex < buttons.length) {
      const button = buttons[noteIndex];
      playNoteAndHighlightButton(button);
    }
  }
}

// Function to handle keyup events
function handleKeyUp(event) {
  const key = event.key.toUpperCase();
  const whiteKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I']; // White keys
  const blackKeys = ['2', '3', '5', '6', '7']; // Black keys
  let noteIndex = whiteKeys.indexOf(key);
  let buttons;

  if (noteIndex === -1) {
    noteIndex = blackKeys.indexOf(key);
    buttons = document.querySelectorAll('.black-key'); // Select only black keys
  } else {
    buttons = document.querySelectorAll('.white-key'); // Select only white keys
  }

  if (noteIndex !== -1) {
    if (noteIndex >= 0 && noteIndex < buttons.length) {
      const button = buttons[noteIndex];
      releaseNoteAndRemoveHighlight(button);
    }
  }
}

// Add event listeners for keydown and keyup events
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
