import React from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid'

function GameWindow() {
  return (
    <div className="GameWindow game-background-original-outer">
      <TopMenu />
      <Grid />
    </div>
  );
}

export default GameWindow;