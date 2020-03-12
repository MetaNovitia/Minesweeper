import React, { useState }  from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid';
import Settings from '../Settings/Settings';
import {randomMineGenerator, emptyGrid, openTile, checkFlag, countSafe, clearSquare} from './mineGenerator';
import BotRoom from './Bot/BotRoom';

const cell_size_init=20;
const min_width=250;
const initialSetting = {height: 16, width: 30, mines: 99};

/* tile state : 
	0 = closed
	1 = opened
	2 = mousedown
	3 = flagged
*/

function GameWindow(props) {

	const gameData = useState({
		timer: {time:0, timerID:0, timerStopped: true},
		safeLeft: countSafe(initialSetting),
		settings:initialSetting
	})[0];
	const [mousedown, setMousedown] = useState(0);
	const [numberOfMinesLeft, setnumberOfMinesLeft] = useState(gameData.settings.mines);
	const [gameState, setGameState] = useState("IDLE");
	
	var cell_size = Math.max(cell_size_init, Math.ceil(min_width/gameData.settings.width));

	const [grid, setGrid] = useState(randomMineGenerator(gameData.settings));	
	const [state, setState] = useState(emptyGrid(gameData.settings));	

	// restarts game and reset states, moving back to IDLE
	function restart() {
		clearTimeout(gameData.timer.timerId);
		gameData.timer = {time:0, timerID:0, timerStopped: true};
		gameData.safeLeft = countSafe(gameData.settings);
		setGrid(randomMineGenerator(gameData.settings));
		setState(emptyGrid(gameData.settings));
		setnumberOfMinesLeft(gameData.settings.mines);
		setGameState("IDLE");
	}

	function lose() {
		var i,j;
		for(i=0; i<state.length; i++){
			for(j=0; j<state[i].length; j++) {
				if (grid[i][j] === -1 && state[i][j] !== 3) 
					state[i][j] = 1;
				else if (state[i][j] === 3 && grid[i][j] !== -1) {
					grid[i][j] = -3;
					state[i][j] = 1;
				}
			}
		}
		clearTimeout(gameData.timer.timerId);
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
		clearTimeout(gameData.timer.timerId);
		setnumberOfMinesLeft(0);
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
						if (gameState === "IDLE") {
							clearSquare(grid, row, col, gameData.safeLeft);
							setGameState("PLAY");
						}

						if (grid[row][col] === -1){
							grid[row][col] = -2;
							lose();
						} else {
							gameData.safeLeft -= openTile(grid, state, row, col);
							if (gameData.safeLeft === 0) win();
						}
					} else if (val === 3) {
						setnumberOfMinesLeft(numberOfMinesLeft-1);
					}
				} else if(val === 3) {
					state[row][col] = 0;
					setnumberOfMinesLeft(numberOfMinesLeft+1);
				}
			}
		}
	}

	return (
		<div className={"Container"}>
			<div className={`GameWindow game-background-outer-${props.theme}`}>
				<Settings restart={restart} gameData={gameData} theme={props.theme}/>
				<TopMenu 
					number={numberOfMinesLeft} theme={props.theme}
					restart={restart}  gameState={gameState} mousedown={mousedown}
					width={gameData.settings.width * cell_size} timerData={gameData.timer}/>
				<Grid
					theme={props.theme} grid={grid} state={state} click={click}
					height={gameData.settings.height} width={gameData.settings.width} cell_size={cell_size}
					setMines={setnumberOfMinesLeft} mousedown={mousedown} setMousedown={setMousedown}/>
			</div>

			<BotRoom theme={props.theme}/>
		</div>
	);
}

export default GameWindow;