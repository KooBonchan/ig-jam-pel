import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import HeroImage from 'src/assets/images/backgrounds/kari-shea-laHwVPkMTzY-unsplash.jpg';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useNavigate } from 'react-router';

const HeroContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundImage: `url(${HeroImage})`,
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
  padding: "0 1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const GoogleButton = styled(Button)({
  marginTop:"1rem",
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
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:8094/oauth2/authorization/google';
  };

  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
  }

  const fetchUser = (token) => {
    axios.get('http://localhost:8094/api/user', {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      setUser({
        fullname: response.data.fullname,
        picture: response.data.picture,
      });
      setAccessToken(token);
      navigate("/music");
    })
    .catch((error) => {
      console.error("Error fetching user: ", error);
      if(error.response?.status === 401 || !token){
        handleGoogleSignIn();
      }
    })
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access_token');
    if (token) {
      fetchUser(token);
      window.history.replaceState({}, document.title, '/');
    } else if (!accessToken){
      handleGoogleSignIn();
    }
  }, [accessToken]);

  return (
    <HeroContainer>
      <HeroContent>
        <Typography
          variant="h1"
          fontWeight={700}
          gutterBottom
          sx={{
            fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
            lineHeight: 1.2,
          }}
        >
          [&nbsp;ig-JAM-pəl&nbsp;]
        </Typography>
        <Typography
          variant="h4"
          color="white"
          gutterBottom
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            lineHeight: 1.4,
          }}
        >
          for only me: the bass hobbyist
        </Typography>
        <GoogleButton onClick={handleGoogleSignIn} startIcon={<GoogleIcon />
        }>
          Sign in with Google
        </GoogleButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
