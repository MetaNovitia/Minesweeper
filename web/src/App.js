import React, {useState} from 'react';
import GameWindow from './components/GameWindow/GameWindow';
import './App.css';

function App() {

	return (
		<div className="App">
			<div className="AppContent">
				<GameWindow theme="original"/>
			</div>
		</div>
	);
}

export default App;
