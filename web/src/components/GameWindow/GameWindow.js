import React, { useState }  from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid';

function GameWindow() {

	const [numberOfMinesLeft, setnumberOfMinesLeft] = useState(99);
	const [isStarted, setStart] = useState(false);

	function restart() {
		setStart(false);
		setnumberOfMinesLeft(99);
	}

	return (
		<div className="GameWindow game-background-original-outer">
			<TopMenu number={numberOfMinesLeft} restart={restart} isStarted={isStarted}/>
			<Grid />
			<button onClick={() => setStart(true)}/>
		</div>
	);
}

export default GameWindow;