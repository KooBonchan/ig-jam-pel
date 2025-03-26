import { FiberManualRecord, Pause, PlayArrow, Stop } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Container, useMediaQuery, useTheme } from '@mui/material';
import { blueGrey, red } from '@mui/material/colors';
import { IconMetronome } from '@tabler/icons-react';
import * as React from 'react';
import sampleMp3 from '../../assets/musics/C Boogie Woogie.mp3'


export default function MusicRecord() {
  const audioRef = React.useRef(new Audio(sampleMp3));
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    console.log('play');
    setIsPlaying(true);
  }
  const handlePause = () => {
    audioRef.current.pause();
    console.log('pause', isPlaying);
    setIsPlaying(false);
  }
  const handleStop = () => { 
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }


  return (
    <>
      <MusicControls isPlaying={isPlaying} onPlay={handlePlay} onPause={handlePause} onStop={handleStop}/>
      <Box width='90%' height='20vh' sx={{ backgroundColor: '#ccc', margin: '3rem auto' }} />
      <Box width='90%' height='20vh' sx={{ backgroundColor: '#ccc', margin: '3rem auto' }} />
    </>
  );
}


// eslint-disable-next-line react/prop-types
const MusicControls = ({isPlaying, onPlay, onPause, onStop}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detects mobile screen

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
          disabled={isPlaying}>
          {!isMobile && "PLAY"}
        </Button>
        <Button startIcon={<Pause />} aria-label="Pause"
          onClick={onPause}
          disabled={!isPlaying}>
          {!isMobile && "PAUSE"}
        </Button>
        <Button startIcon={<Stop />} aria-label="Stop"
          onClick={onStop}>
          {!isMobile && "STOP"}
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" aria-label="Additional Controls">
        <Button
          startIcon={<FiberManualRecord sx={{ color: red[500] }} />}
          aria-label="Record">
          {!isMobile && "Record"}
        </Button>
        <Button
          startIcon={<IconMetronome style={{ color: blueGrey[600] }} />}
          aria-label="Metronome">
          {!isMobile && "Metronome"}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

