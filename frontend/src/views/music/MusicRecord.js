import { LockClock, Pause, PlayArrow, RecordVoiceOver, Stop, FiberManualRecord } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Container, useMediaQuery, useTheme } from '@mui/material';
import { blueGrey, grey, red } from '@mui/material/colors';
import { IconMetronome } from '@tabler/icons-react';
import * as React from 'react';


export default function MusicRecord() {
  return (
    <>
      <MusicControls />
      <Box width='90%' height='20vh' sx={{backgroundColor: '#ccc', margin: '3rem auto'}} />
      <Box width='90%' height='20vh' sx={{backgroundColor: '#ccc', margin: '3rem auto'}} />
    </>
  );
}


const MusicControls = () => {
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
        <Button startIcon={<PlayArrow />} aria-label="Play">
          {!isMobile && "PLAY"}
        </Button>
        <Button startIcon={<Pause />} aria-label="Pause">
          {!isMobile && "PAUSE"}
        </Button>
        <Button startIcon={<Stop />} aria-label="Stop">
          {!isMobile && "STOP"}
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined" aria-label="Additional Controls">
        <Button
        startIcon={<FiberManualRecord sx={{color:red[500]}}/>}
        aria-label="Record">
          {!isMobile && "Record"}
        </Button>
        <Button
        startIcon={<IconMetronome style={{color:blueGrey[600]}}/>}
        aria-label="Metronome">
          {!isMobile && "Metronome"}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

