import React, {useState} from 'react';
import './Settings.css';
import '../GameWindow/GameWindow.css';
// import {countSafe} from '../GameWindow/mineGenerator';

const difficulties = {
	beginner: {height: 9, width: 9, mines: 10},
	intermediate: {height: 16, width: 16, mines: 40},
	expert: {height: 16, width: 30, mines: 99}
}

function App(props) {

	const [diffSelected, selectDiff] = useState("expert");

	return (
		<div className="Settings">
			{
				Object.keys(difficulties).map((val)=>{
					var className = `game-background-${
						val===diffSelected ? "inner" : "outer"}-${props.theme}`;
					return <button 
						className={className} 
						key={val} 
						onClick={()=>{
							props.gameData.settings = difficulties[val];
							selectDiff(val);
							props.restart();
						}}>{val}</button>;
				})
			}
		</div>
	);
}

export default App;
