export const playClick = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine'; // Simple tone
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 800 Hz for a sharp click
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Volume
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1); // Quick decay

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1); // Short duration click

  // Cleanup
  oscillator.onended = () => {
    oscillator.disconnect();
    gainNode.disconnect();
    audioContext.close();
  };
};