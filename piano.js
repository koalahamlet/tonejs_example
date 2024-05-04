const synth = new Tone.Synth().toDestination();

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    const note = key.dataset.note;
    synth.triggerAttackRelease(note, '8n');
  });
});
