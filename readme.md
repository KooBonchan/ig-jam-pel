# Project Overview: igJAMpəl

## Introduction

**igJAMpəl** is a web-based dashboard designed to help bass guitarists like me improve their skills through **interactive jam sessions** and **personalized progress tracking**. The platform provides users with an engaging environment where they can practice, record, and track their learning journey in a meaningful way.

The primary goal is to make the learning process fun, personalized, and responsive. By using real-time interactions, users can fine-tune their skills and challenge themselves through personalized jam sessions and progress tracking features.

## Features

### 1. **User Authentication**
- **Login/Sign Up**: Secure user authentication with google OAuth2.0
  
### 2. **Interactive Jam Sessions**
- **Jam Tracks**: Users can practice with a variety of bass-friendly jam tracks, designed to fit various skill levels and genres.
- **Record Your Jam**: Users can record their own jam sessions to review and track progress. Recorded jams can be stored in their personal profile.
  
### 4. **Bass Guitar Lessons and Tips**
- **Interactive Lessons**: Short, self-paced lessons that introduce different techniques, scales, and genres. 
- **Quick Tips**: Context-sensitive tips and tricks that show up based on the user’s current skill level and practice session.
  
### 5. **Personalized Dashboard**
- **Visual Progress**: A clean and intuitive dashboard showing the user's skills, recent jams, achievements, and lessons completed.
- **Achievements**: Users earn badges or unlock new levels as they complete various milestones, such as mastering a chord, reaching a specific practice time, or recording a certain number of sessions.

---

## Tech Stack

- **Frontend**: React.js with Bootstrap for responsive UI
- **Backend**: Node.js and Express.js
- **Database**: MongoDB (for storing user profiles, session data, and recorded jams)
- **Authentication**: JWT (JSON Web Tokens) for secure authentication
- **Version Control**: Git, GitHub
- **Hosting**: Heroku or DigitalOcean for deployment

---

## User Flow

1. **Landing Page**: Users arrive on the homepage, where they can sign up, log in, or explore featured jam sessions.
2. **Login / Sign Up**: Users create an account or log in to access personalized features and save their progress.
3. **Dashboard**: Once logged in, the user sees an overview of their progress, upcoming jams, and any new lessons or tips.
4. **Jam Session**: Users select a jam track to practice or join an interactive jam session with other users.
5. **Feedback & Progress**: After finishing a session, they receive feedback and can track improvements over time.
6. **Recording**: Users can record their jam sessions, store them for review, and share them with friends or the community.

---

## Interactive Jam Session Example

- **Jam Track Selection**: Choose from various genres like blues, rock, jazz, or funk.
- **Difficulty Adjustments**: Based on the user’s skill level, the system suggests appropriate jam tracks.
- **Real-time Syncing**: If collaborating with other users, the system ensures synchronized playing in real time.
- **Recording & Feedback**: Users can record their performance and receive insights on how to improve based on tempo, timing, and rhythm.