import React, { useState } from 'react';
import '../GameWindow.css';

function Grid(props) {

	var height = props.height * props.cell_size;
	var width = props.width * props.cell_size;
	return (
		<div
			className={`Grid game-background-inner-${props.theme}`}
			style={{height: `${height}px`, width: `${width}px`}}>
			{
				props.grid.map((row, ind)=> {
					var cells = [];
					for(var i=0; i<props.width; i++){
						cells.push(
							<Cell 
								tile={row[i].toString()} theme={props.theme} 
								key={`row-${ind}-col-${i}`}
								cell_size={props.cell_size}/>);
						}
					return <div key={`row-${ind}`} style={{height:props.cell_size}}>{cells}</div>;
				})
			}
		</div>
	);
}

function Cell(props) {
	return (
		<img 
			alt="" style={{
				width:`${props.cell_size}px`, 
				height:`${props.cell_size}px`}}
			src={require(`../../../assets/${props.theme}/${props.tile}.png`)}/>
	)
}

export default Grid;