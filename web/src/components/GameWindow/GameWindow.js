import React, { useState }  from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid';
import {randomMineGenerator, emptyGrid, openTile} from './mineGenerator';

const cell_size=20

function GameWindow(props) {

	const [mousedown, setMousedown] = useState(false);
	const [numberOfMinesLeft, setnumberOfMinesLeft] = useState(props.mines);
	const [gameState, setGameState] = useState("IDLE");
	const [gameData, setGameData] = useState({
		time:0, 
		timerID:0, 
		safeLeft: props.width*props.height - props.mines
	});

	const [grid, setGrid] = useState(randomMineGenerator(props.height, props.width, props.mines));	
	const [state, setState] = useState(emptyGrid(props.height, props.width));	
	/* tile state : 
		0 = closed
		1 = opened
		2 = mousedown
		3 = flagged
	*/

	// restarts game and reset states, moving back to IDLE
	function restart() {
		clearTimeout(gameData.timerId);
		gameData.safeLeft = props.width*props.height - props.mines;
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
		clearTimeout(gameData.timerId);
		setGameState("LOST");
	}

	function win() {
		var i,j;
		for(i=0; i<state.length; i++){
			for(j=0; j<state[i].length; j++) {
				state[i][j] = 1;
				if (grid[i][j] === -1) state[i][j] = 3;
			}
		}
		clearTimeout(gameData.timerId);
		setGameState("WIN");
	}

	// clicking on a tile, passed into grid and called 
	// by each Cell
	function click(row, col, val) {
		if (state[row][col]!==1) {
			state[row][col] = val;
			if (val === 1) {
				if (grid[row][col] === -1) lose(row, col);
				else {
					gameData.safeLeft -= openTile(grid, state, row, col);
					if (gameData.safeLeft === 0) win();
					else if (gameState === "IDLE") setGameState("PLAY");
				}

			}
		}
	}

	return (
		<>
			<div className={`GameWindow game-background-outer-${props.theme}`}>
				<TopMenu 
					number={numberOfMinesLeft} theme={props.theme}
					restart={restart}  gameState={gameState} mousedown={mousedown}
					width={props.width * cell_size} timerData={gameData}/>
				<Grid 
					theme={props.theme} grid={grid} state={state} click={click}
					height={props.height} width={props.width} cell_size={cell_size}
					setMines={setnumberOfMinesLeft} mousedown={mousedown} setMousedown={setMousedown}/>
			</div>
		</>
	);
}

export default GameWindow;