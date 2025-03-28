import { FiberManualRecord, Pause, PlayArrow, Stop } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { blueGrey, red } from '@mui/material/colors';
import { IconMetronome } from '@tabler/icons-react';
import * as React from 'react';
import sampleMp3 from '../../assets/musics/C Boogie Woogie.mp3';
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugins/microphone.esm.js';
import { playClick } from './click.js';

export default function MusicRecord() {
  const waveformRef = React.useRef(null);
  const micWaveformRef = React.useRef(null);
  const wavesurferRef = React.useRef(null);
  const micWavesurferRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);

  React.useEffect(() => {
    // Playback waveform setup
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      cursorColor: 'navy',
      barWidth: 2,
      barRadius: 3,
      height: 100,
      responsive: true,
    });

    wavesurferRef.current.load(sampleMp3);

    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));
    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
      wavesurferRef.current.setTime(0);
    });

    // Microphone waveform setup
    micWavesurferRef.current = WaveSurfer.create({
      container: micWaveformRef.current,
      waveColor: 'red',
      progressColor: 'orange',
      height: 100,
      responsive: true,
    });

    micWavesurferRef.current.registerPlugin(MicrophonePlugin.create());

    return () => {
      wavesurferRef.current.destroy();
      micWavesurferRef.current.destroy();
    };
  }, []);

  const playCountIn = async () => {
    const bpm = 93;
    const beatDuration = 60 / bpm * 1000; // Convert BPM to milliseconds
    for (let i = 0; i < 4; i++) {
      playClick();
      await new Promise(resolve => setTimeout(resolve, beatDuration));
    }
  };

  const handlePlay = () => wavesurferRef.current.play();
  const handlePause = () => wavesurferRef.current.pause();
  const handleStop = () => {
    wavesurferRef.current.stop();
    setIsPlaying(false);
  };

  const handleRecord = async () => {
    if (!isRecording) {
      try {
        // Play 4 clicks at 93 BPM with 0.2s initial offset
        await new Promise(resolve => setTimeout(resolve, 200)); // 0.2s offset
        await playCountIn();
        
        // Start recording and playback
        await micWavesurferRef.current.plugins[0].start();
        wavesurferRef.current.play();
        setIsRecording(true);
        setIsPlaying(true);
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    } else {
      micWavesurferRef.current.plugins[0].stop();
      wavesurferRef.current.stop();
      setIsRecording(false);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Bass Practice Mate
      </Typography>
      <MusicControls 
        isPlaying={isPlaying} 
        isRecording={isRecording}
        onPlay={handlePlay} 
        onPause={handlePause} 
        onStop={handleStop}
        onRecord={handleRecord}
      />
      <Box width='90%' sx={{ margin: '2rem auto' }}>
        <Typography variant="body2" color="textSecondary">Backing Track</Typography>
        <div ref={waveformRef} style={{ backgroundColor: '#ccc' }} />
      </Box>
      <Box width='90%' sx={{ margin: '2rem auto' }}>
        <Typography variant="body2" color="textSecondary">Your Bass</Typography>
        <div ref={micWaveformRef} style={{ backgroundColor: '#ccc' }} />
      </Box>
    </>
  );
}

// eslint-disable-next-line react/prop-types
const MusicControls = ({ isPlaying, isRecording, onPlay, onPause, onStop, onRecord }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
      <ButtonGroup variant="outlined" aria-label="Music Controls">
        <Button
          startIcon={<PlayArrow />}
          aria-label="Play"
          onClick={onPlay}
          disabled={isPlaying || isRecording}>
          {!isMobile && "LISTEN"}
        </Button>
        <Button 
          startIcon={<Pause />} 
          aria-label="Pause"
          onClick={onPause}
          disabled={!isPlaying || isRecording}>
          {!isMobile && "PAUSE"}
        </Button>
        <Button 
          startIcon={<Stop />} 
          aria-label="Stop"
          onClick={onStop}
          disabled={!isPlaying || isRecording}>
          {!isMobile && "STOP"}
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" aria-label="Additional Controls">
        <Button
          startIcon={<FiberManualRecord sx={{ color: isRecording ? red[900] : red[500] }} />}
          aria-label="Record"
          onClick={onRecord}>
          {!isMobile && (isRecording ? "STOP" : "START PRACTICE")}
        </Button>
        <Button
          startIcon={<IconMetronome style={{ color: blueGrey[600] }} />}
          aria-label="Metronome">
          {!isMobile && "METRONOME"}
        </Button>
      </ButtonGroup>
    </Container>
  );
};