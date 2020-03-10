import React from 'react';
import '../GameWindow.css';

function Grid(props) {

	var height = props.height * props.cell_size;
	var width = props.width * props.cell_size;

	return (
		<div 
			className={`Grid game-background-inner-${props.theme}`}
			style={{height: `${height}px`, width: `${width}px`}}>
			
		</div>
	);
}

export default Grid;