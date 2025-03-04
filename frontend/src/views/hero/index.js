import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import GoogleIcon from '@mui/icons-material/Google';

const HeroContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundImage: "url('https://source.unsplash.com/random/1920x1080?music,bass')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  textAlign: "center",
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

const HeroContent = styled(Box)({
  position: "relative",
  zIndex: 2,
});

const GoogleButton = styled(Button)({
  backgroundColor: "white",
  color: "#424242",
  borderRadius: 24,
  padding: "0.75rem 1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3)",
  },
});

const Hero = () => {
  const handleGoogleSignIn = () => {
    console.log("Google sign-in clicked");
  };

  return (
    <HeroContainer>
      <HeroContent>
        <Typography variant="h1" fontWeight={700} gutterBottom>
          [ig-JAM-pəl]
        </Typography>
        <Typography variant="subtitle1" color="gray" gutterBottom>
          for only me: the bass hobbyist
        </Typography>
        <GoogleButton onClick={handleGoogleSignIn} startIcon={<GoogleIcon />}>
          Sign in with Google
        </GoogleButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
