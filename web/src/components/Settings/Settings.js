import React from 'react';
import './Settings.css';

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
					return <button onClick={()=>{
						props.gameData.settings = difficulties[val];
						props.restart();
					}}>{val}</button>;
				})
			}
		</div>
	);
}

export default App;
