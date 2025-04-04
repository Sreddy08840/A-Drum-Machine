import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Audio clips data
const drumPads = [
  {
    id: 'Heater-1',
    key: 'Q',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    id: 'Heater-2',
    key: 'W',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    id: 'Heater-3',
    key: 'E',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    id: 'Heater-4',
    key: 'A',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    id: 'Clap',
    key: 'S',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    id: 'Open-HH',
    key: 'D',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    id: 'Kick-n\'-Hat',
    key: 'Z',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    id: 'Kick',
    key: 'X',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    id: 'Closed-HH',
    key: 'C',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

// 3D Animation keyframes
const pressAnimation = keyframes`
  0% { transform: translateY(0) rotateX(0); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
  50% { transform: translateY(5px) rotateX(20deg); box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
  100% { transform: translateY(0) rotateX(0); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotateY(0deg); }
  50% { transform: translateY(-10px) rotateY(5deg); }
  100% { transform: translateY(0px) rotateY(0deg); }
`;

// Styled components
const DrumMachineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
  font-family: 'Arial', sans-serif;
  perspective: 1000px;
`;

const MachineBody = styled.div`
  width: 400px;
  padding: 30px;
  background: linear-gradient(145deg, #2a2a3a, #1e1e2e);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5),
              inset 0 0 10px rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  animation: ${floatAnimation} 6s ease-in-out infinite;
`;

const Display = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 30px;
  background: #0f0f1a;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  border: 2px solid #444;
`;

const PadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const DrumPad = styled.button`
  position: relative;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(145deg, #3a3a4a, #2a2a3a);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  transition: all 0.1s ease;
  
  &:active, &.active {
    animation: ${pressAnimation} 0.3s ease;
    background: linear-gradient(145deg, #4a4a5a, #3a3a4a);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    transform: translateY(-3px) rotateY(5deg);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }
`;

const Title = styled.h1`
  margin-bottom: 30px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  margin-top: 30px;
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
`;

// Main component
function App() {
  const [displayText, setDisplayText] = useState('Drum Machine');
  const [activePad, setActivePad] = useState(null);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      const pad = drumPads.find(pad => pad.key === key);
      
      if (pad) {
        playSound(pad);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Play sound function
  const playSound = (pad) => {
    const audio = document.getElementById(pad.key);
    audio.currentTime = 0;
    audio.play();
    setDisplayText(pad.id);
    setActivePad(pad.key);
    
    setTimeout(() => {
      setActivePad(null);
    }, 300);
  };

  return (
    <DrumMachineContainer id="drum-machine">
      <Title>3D Drum Machine</Title>
      <MachineBody>
        <Display id="display">{displayText}</Display>
        <PadGrid>
          {drumPads.map((pad) => (
            <DrumPad
              key={pad.key}
              id={pad.id}
              className={`drum-pad ${activePad === pad.key ? 'active' : ''}`}
              onClick={() => playSound(pad)}
            >
              {pad.key}
              <audio
                id={pad.key}
                className="clip"
                src={pad.src}
              />
            </DrumPad>
          ))}
        </PadGrid>
      </MachineBody>
      <Subtitle>Press keys Q, W, E, A, S, D, Z, X, C or click the pads</Subtitle>
    </DrumMachineContainer>
  );
}

export default App;