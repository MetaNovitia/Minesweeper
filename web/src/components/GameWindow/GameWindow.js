import React, { useState }  from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid';
import {randomMineGenerator, emptyGrid, openTile, checkFlag} from './mineGenerator';

const cell_size=20

function GameWindow(props) {

	const [mousedown, setMousedown] = useState(false);
	const [numberOfMinesLeft, setnumberOfMinesLeft] = useState(props.mines);
	const [gameState, setGameState] = useState("IDLE");
	const [gameData, setGameData] = useState({
		time:0, 
		timerID:0, 
		safeLeft: props.width*props.height - props.mines,
		timerStopped: true
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
		gameData.timerStopped = true;
		setGrid(randomMineGenerator(props.height, props.width, props.mines));
		setState(emptyGrid(props.height, props.width));
		setnumberOfMinesLeft(props.mines);
		setGameState("IDLE");
	}

	function lose() {
		var i,j;
		for(i=0; i<state.length; i++){
			for(j=0; j<state[i].length; j++) {
				if (grid[i][j] === -1 && grid[i][j] !== 3) 
					state[i][j] = 1;
				else if (state[i][j] === 3 && grid[i][j] !== -1) {
					grid[i][j] = -3;
					state[i][j] = 1;
				}
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
		if(gameState === "IDLE" || gameState === "PLAY"){
			if (state[row][col] === 1) {
				// testing surrounding
				if (val === 3){
					var result = checkFlag(grid, state, row, col);
					gameData.safeLeft -= result;
					if (result === -1) lose();
					else if (gameData.safeLeft === 0) win();
				}
			} else {
				if(state[row][col]!==3) {
					state[row][col] = val;
					if (val === 1) {
						if (grid[row][col] === -1){
							grid[row][col] = -2;
							lose();
						}
						else {
							gameData.safeLeft -= openTile(grid, state, row, col);
							if (gameData.safeLeft === 0) win();
							else if (gameState === "IDLE") setGameState("PLAY");
						}
					} else if (val === 3) {
						setnumberOfMinesLeft(numberOfMinesLeft-1);
					}
				} else if(val === 3) state[row][col] = 0;
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