import React, { useState }  from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid';
import {randomMineGenerator, emptyGrid} from './mineGenerator';

const cell_size=20

function GameWindow(props) {

	const [numberOfMinesLeft, setnumberOfMinesLeft] = useState(props.mines);
	const [isStarted, setStart] = useState(false);
	const [grid, setGrid] = useState(randomMineGenerator(props.height, props.width, props.mines));
	const [state, setState] = useState(emptyGrid(props.height, props.width));

	function restart() {
		setStart(false);
		setGrid(randomMineGenerator(props.height, props.width, props.mines));
		setState(emptyGrid(props.height, props.width));
		setnumberOfMinesLeft(99);
	}

	function click(row, col, val) {
		if (state[row][col]!==1) {
			state[row][col] = val;
		}
 
		if (!isStarted && val===1) setStart(true);
	}

	return (
		<>
			<div className={`GameWindow game-background-outer-${props.theme}`}>
				<TopMenu 
					number={numberOfMinesLeft} theme={props.theme}
					restart={restart} isStarted={isStarted}
					width={props.width * cell_size}/>
				<Grid 
					theme={props.theme} grid={grid} state={state} click={click}
					height={props.height} width={props.width} cell_size={cell_size}
					setMines={setnumberOfMinesLeft}/>
			</div>
		</>
	);
}

export default GameWindow;