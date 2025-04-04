import { FiberManualRecord, Pause, PlayArrow, Stop } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { blueGrey, red } from '@mui/material/colors';
import { IconMetronome } from '@tabler/icons-react';
import { useRef, useState, useEffect } from 'react';
import sampleMp3 from '../../assets/musics/C Boogie Woogie.mp3';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import { playClick } from './click.js';

const useWaveSurfer = ({ container, audioFile, options }) => {
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({ container, ...options });
    if (audioFile) wavesurferRef.current.load(audioFile);

    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));
    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
      wavesurferRef.current.setTime(0);
    });

    return () => wavesurferRef.current.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container, audioFile]);

  return {
    wavesurfer: wavesurferRef.current,
    isPlaying,
    play: () => wavesurferRef.current.play(),
    pause: () => wavesurferRef.current.pause(),
    stop: () => wavesurferRef.current.stop()
  };
};

const useRecorder = ({ container, options }) => {
  const wavesurferRef = useRef(null);
  const recordPluginRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({ container, ...options });
    recordPluginRef.current = wavesurferRef.current.registerPlugin(RecordPlugin.create());
    return () => wavesurferRef.current.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  return {
    recorder: recordPluginRef.current,
    isRecording,
    startRecording: () => recordPluginRef.current.startRecording().then(() => setIsRecording(true)),
    stopRecording: () => {
      recordPluginRef.current.stopRecording();
      setIsRecording(false);
    }
  };
};

export default function MusicRecord() {
  const waveformRef = useRef(null);
  const micWaveformRef = useRef(null);

  const playback = useWaveSurfer({
    container: waveformRef.current,
    audioFile: sampleMp3,
    options: {
      waveColor: 'violet',
      progressColor: 'purple',
      cursorColor: 'navy',
      barWidth: 2,
      barRadius: 3,
      height: 100,
      responsive: true,
    }
  });

  const recorder = useRecorder({
    container: micWaveformRef.current,
    options: {
      waveColor: 'red',
      progressColor: 'orange',
      height: 100,
      responsive: true
    }
  });

  useEffect(() => {
    if (playback.wavesurfer && recorder.isRecording) {
      const handleFinish = () => {
        recorder.stopRecording();
      };
      playback.wavesurfer.on('finish', handleFinish);
      return () => playback.wavesurfer.off('finish', handleFinish);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playback.wavesurfer, recorder.isRecording]);

  const playCountIn = async () => {
    const bpm = 93;
    const beatDuration = 60 / bpm * 1000; // Convert BPM to milliseconds
    for (let i = 0; i < 4; i++) {
      playClick();
      await new Promise(resolve => setTimeout(resolve, beatDuration));
    }
  };

  const handleRecord = async () => {
    if (!recorder.isRecording) {
      await new Promise(resolve => setTimeout(resolve, 200));
      await playCountIn();
      await recorder.startRecording();
      playback.play();
    } else {
      recorder.stopRecording();
      playback.stop();
    }
  };

  return (
    <>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Bass Practice Mate
      </Typography>
      <MusicControls
        isPlaying={playback.isPlaying}
        isRecording={recorder.isRecording}
        onPlay={playback.play}
        onPause={playback.pause}
        onStop={playback.stop}
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