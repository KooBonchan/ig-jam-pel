### Requirements for Music Play and Record Feature
1. **Music Playback**:
   - Users can play audio (e.g., preloaded music or uploaded files).
   - Controls: "Play" to start, "Pause" to pause, and "Stop" to stop playback.

2. **Audio Recording**:
   - Users can record audio input from their microphone.
   - Controls: "Record" to start recording, "Stop" to end and save the recording.

3. **Waveform Visualization**:
   - Display real-time waveforms in two separate `Box` components:
     - First `Box`: Waveform of the microphone input.
     - Second `Box`: Waveform of the music output.
   - Waveforms should dynamically update as audio plays or is recorded.

4. **User Interface**:
   - Buttons: Play, Pause, Stop, Record, and Metronome (optional functionality).
   - Responsive design: Buttons adapt to mobile screens (text hidden on small screens).
   - Visual feedback: Buttons should reflect the current state (e.g., disable "Play" while playing).

5. **Optional Metronome**:
   - Provide a metronome feature to play periodic clicks at a set tempo (BPM).


## Feature expectations.

1. Backing track
   1. file, name, uploaded date
   2. metadata: tempo, clicks and beats, offset.
   3. to register: if recorded here, just register with given backing track.
   4. to register new, user manually writes, with realtime testing.
   5. possibly, track stack? not yet.
2. Practice results
   1. name, track stack
   2. 