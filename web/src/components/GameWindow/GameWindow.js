import React, { useState }  from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid';

const cell_size=20

function GameWindow(props) {

	const [numberOfMinesLeft, setnumberOfMinesLeft] = useState(props.mines);
	const [isStarted, setStart] = useState(false);

	function restart() {
		setStart(false);
		setnumberOfMinesLeft(99);
	}

	return (
		<div className={`GameWindow game-background-outer-${props.theme}`}>
			<TopMenu 
				number={numberOfMinesLeft} theme={props.theme}
				restart={restart} isStarted={isStarted}
				width={props.width * cell_size}/>
			<Grid 
				theme={props.theme} 
				height={props.height} width={props.width} cell_size={cell_size}
				mines={props.mines} setMines={setnumberOfMinesLeft}/>
			{/* <button onClick={() => setStart(true)}/> */}
		</div>
	);
}

export default GameWindow;