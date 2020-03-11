import React, { useState }  from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid';
import {randomMineGenerator, emptyGrid, openTile} from './mineGenerator';

const cell_size=20

function GameWindow(props) {

	const [numberOfMinesLeft, setnumberOfMinesLeft] = useState(props.mines);
	const [timerData, setTimerData] = useState({time:0, timerID:0});
	const [gameState, setGameState] = useState("IDLE");

	const [grid, setGrid] = useState(randomMineGenerator(props.height, props.width, props.mines));
	const [state, setState] = useState(emptyGrid(props.height, props.width));		// tile state

	// restarts game and reset states, moving back to IDLE
	function restart() {
		clearTimeout(timerData.timerId);
		setGrid(randomMineGenerator(props.height, props.width, props.mines));
		setState(emptyGrid(props.height, props.width));
		setnumberOfMinesLeft(99);
		setGameState("IDLE");
	}

	function lose(row, col) {
		grid[row][col] = -2;
		var i,j;
		for(i=0; i<state.length; i++){
			for(j=0; j<state[i].length; j++) {
				if (grid[i][j] === -1) state[i][j] = 1;
			}
		}
		clearTimeout(timerData.timerId);
		setGameState("LOST");
	}

	// clicking on a tile, passed into grid and called 
	// by each Cell
	function click(row, col, val) {
		if (state[row][col]!==1) {
			state[row][col] = val;
			if (val === 1) {
				if (grid[row][col] === 0) openTile(grid, state, row, col);
				else if (grid[row][col] === -1) lose(row, col);
			}
		}
		if (gameState === "IDLE" && val===1) setGameState("PLAY");
	}

	return (
		<>
			<div className={`GameWindow game-background-outer-${props.theme}`}>
				<TopMenu 
					number={numberOfMinesLeft} theme={props.theme}
					restart={restart}  gameState={gameState}
					width={props.width * cell_size} timerData={timerData}/>
				<Grid 
					theme={props.theme} grid={grid} state={state} click={click}
					height={props.height} width={props.width} cell_size={cell_size}
					setMines={setnumberOfMinesLeft}/>
			</div>
		</>
	);
}

export default GameWindow;