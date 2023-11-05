import './App.css';
import React, { useState } from 'react';
import Cards from './components/Cards/Cards';
import SuccessScreen from './components/SuccessScreen/SuccessScreen';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';

function App() {
  const [userName, setUserName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleNameEntered = (name) => {
    setUserName(name);
  };

  const handleStartGame = (name) => {
    setGameStarted(true);
  };

  const handleGameComplete = () => {
    setGameCompleted(true);
  };

  return (
    <>
      {!gameStarted && !gameCompleted && (
        <WelcomeScreen onNameEntered={handleNameEntered} onPlay={handleStartGame} />
      )}

      {gameStarted && !gameCompleted && (
        <Cards onGameComplete={handleGameComplete} userName={userName} />
      )}

      {gameCompleted && <SuccessScreen userName={userName} />}
    </>
  );
}

export default App;
