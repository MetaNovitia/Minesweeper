import React from 'react';
import './Settings.css';
// import {countSafe} from '../GameWindow/mineGenerator';

const difficulties = {
	beginner: {height: 9, width: 9, mines: 10},
	intermediate: {height: 16, width: 16, mines: 40},
	expert: {height: 16, width: 30, mines: 99}
}

function App(props) {

	return (
		<div className="Settings">
			{
				Object.keys(difficulties).map((val)=>{
					return <button key={val} onClick={()=>{
						props.gameData.settings = difficulties[val];
						props.restart();
					}}>{val}</button>;
				})
			}
		</div>
	);
}

export default App;
