import React from 'react';
import GameWindow from './components/GameWindow/GameWindow';
import './App.css';

function App() {
	return (
		<div className="App">
			<div className="AppContent">
				<GameWindow theme="original" height={16} width={30} mines={5}/>
			</div>
		</div>
	);
}

export default App;
