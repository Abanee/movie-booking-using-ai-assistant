import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import NetflixIntro from "./components/NetflixIntro";
import MovieChatbot from "./components/MovieChatbot";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem('cineai_intro_seen');
    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    localStorage.setItem('cineai_intro_seen', 'true');
  };

  return (
    <>
      {showIntro && !introComplete && (
        <NetflixIntro onComplete={handleIntroComplete} />
      )}
      {(introComplete || !showIntro) && (
        <>
          <Routes />
          <MovieChatbot />
        </>
      )}
    </>
  );
}

export default App;