import React, { useState } from 'react';
import '../GameWindow.css';
import './Grid.css';

function Grid(props) {

	var height = props.height * props.cell_size;
	var width = props.width * props.cell_size;
	const [temp, flush] = useState(0);

	return (
		<div
			onMouseLeave={()=>props.setMousedown(0)}
			className={`Grid game-background-inner-${props.theme}`}
			style={{height: `${height}px`, width: `${width}px`}}>
			{
				props.grid.map((row, ind)=> {
					var cells = [];
					for(var i=0; i<props.width; i++){
						var tile = 
							props.state[ind][i]===1 ? row[i].toString() : 
							props.state[ind][i]===2 ? "0" :
							props.state[ind][i]===3 ? "flag" : "tile";
						cells.push(
							<Cell
								flush={flush} temp={temp}
								setMousedown={props.setMousedown} mousedown={props.mousedown}
								click={props.click} row={ind} col={i}
								tile={tile} theme={props.theme} 
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
	const [ref, setRef] = useState(0);
	const touch = useState({avail: false, context: false})[0];

	return (
		<button className="CellButton"
			ref={(cell) =>  setRef(cell) }
			style={{
			width:`${props.cell_size}px`, 
			height:`${props.cell_size}px`}}
			onContextMenu={(ev) => {
				ev.preventDefault();
				props.click(props.row, props.col, 3);
				touch.context = true;
				return false;
			}}
			onMouseUp={()=> {
				if(props.mousedown && !touch.avail && !touch.context) {
					props.click(props.row, props.col, 1);
				}
				touch.context = true;
				props.setMousedown(0);
			}}
			onTouchStart={()=> {
				touch.avail = true;
				props.setMousedown(Date.now());
				props.click(props.row, props.col, 2);
			}}
			onTouchEnd={()=> {
				if(props.mousedown) {
					props.setMousedown(0);
					if(Date.now() - props.mousedown < 500){
						props.click(props.row, props.col, 1);
					} else {
						props.click(props.row, props.col, 3);
					}
				}
			}}
			onMouseDown={()=> {
				if(!touch.avail){
					props.setMousedown(Date.now());
					props.click(props.row, props.col, 2);
				}
			}}
			onMouseEnter={()=>{
				if(props.mousedown) {
					props.click(props.row, props.col, 2);
					props.flush(1-props.temp);
				}
				ref.focus();
			}}
			onKeyDown={(e)=>{
				if(e.keyCode === 32) {
					props.click(props.row, props.col, 3);
					props.flush(1-props.temp);
				}
			}}
			onMouseLeave={()=> {
				if(props.mousedown) {
					props.click(props.row, props.col, 0);
				}
			}}>
			<img 
				className="Cell"
				alt="" draggable={false} 
				src={require(`../../../assets/${props.theme}/${props.tile}.png`)}/>
		</button>
	)
}

export default Grid;