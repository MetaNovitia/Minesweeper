import React, { useState }  from 'react';
import './GameWindow.css';
import TopMenu from './TopMenu/TopMenu'
import Grid from './Grid/Grid'

function GameWindow() {

	const [numberOfMinesLeft, setnumberOfMinesLeft] = useState(0);

	return (
		<div className="GameWindow game-background-original-outer">
			<TopMenu number={numberOfMinesLeft} />
			<Grid />
		</div>
	);
}

export default GameWindow;