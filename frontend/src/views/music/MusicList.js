import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete, Folder } from '@mui/icons-material';
import * as React from 'react';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));



export default function MusicList() {
  return (
    <Demo>
      <Typography
      sx={{
        textAlign: 'center',
        fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
        mb: '1rem',
      }}>
        Backing Tracks for Bass
      </Typography>
      <List dense={false}>
        {Array(25).keys().map((i) => (
          <ListItem key={i}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <Delete />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Folder />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Single-line item"
              secondary='Secondary text'
            />
          </ListItem>)
        )}
      </List>
    </Demo>
  );
}