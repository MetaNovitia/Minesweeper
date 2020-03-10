import React, { useState }  from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid';
import {randomMineGenerator} from './mineGenerator';

const cell_size=20

function GameWindow(props) {

	const [numberOfMinesLeft, setnumberOfMinesLeft] = useState(props.mines);
	const [isStarted, setStart] = useState(false);
	const [grid, setGrid] = useState(randomMineGenerator(props.height, props.width, props.mines));
	console.log(grid)

	function restart() {
		setStart(false);
		var newGrid = randomMineGenerator(props.height, props.width, props.mines);
		setGrid(newGrid);
		setnumberOfMinesLeft(99);
	}


	return (
		<>
			<div className={`GameWindow game-background-outer-${props.theme}`}>
				<TopMenu 
					number={numberOfMinesLeft} theme={props.theme}
					restart={restart} isStarted={isStarted}
					width={props.width * cell_size}/>
				<Grid 
					theme={props.theme} grid={grid}
					height={props.height} width={props.width} cell_size={cell_size}
					setMines={setnumberOfMinesLeft}/>

				<button 
					style={{position:"absolute", top: 50, height: "50px"}}
					onClick={()=>setStart(true)}>temporary start button</button>
			</div>
		</>
	);
}

export default GameWindow;