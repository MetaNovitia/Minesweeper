import React, { useState } from 'react';
import '../GameWindow.css';
import Counter from './Counter/Counter'

function TopMenu(props) {

	const [time, setTime] = useState(0);
	
	var icon = props.mousedown && (props.gameState==="PLAY" || props.gameState==="IDLE")
		? "PRESS" : props.gameState;

	// increments timer per second
	var timerId=0;
	if(props.gameState==="PLAY") {
		timerId = setTimeout(() => {
			props.timerData.time = time;
			setTime(Math.min(time+1,999));
		}, 1000);
		props.timerData.timerId = timerId;
	}

	function restart() {
		if(props.gameState!=="IDLE"){
			setTime(0);
			props.restart();
		}
	}

    return (
		<div 
			style={{width:`${props.width}px`}}
			className={`TopMenu game-background-inner-${props.theme}`}>
            <CounterGroup count={props.number} theme={props.theme}/>
            <div style={{width:"20%"}}>
				<button 
					className={`PlayButton game-background-outer-${props.theme}`} 
					onClick={restart}>
						<img 
							alt="" draggable={false}
							src={require(`../../../assets/${props.theme}/${icon}.png`)} />
				</button>
            </div>
            <CounterGroup right count={time} theme={props.theme}/>
        </div>
    );
}

function CounterGroup(props) {
	var justify = {};
	if (props.right) justify={justifyContent:"flex-end"}
    return (
        <div className="CounterGroup" style={justify}>
            <Counter theme={props.theme} count={Math.floor(props.count/100)%10}/>
            <Counter theme={props.theme} count={Math.floor(props.count/10)%10}/>
            <Counter theme={props.theme} count={Math.floor(props.count/1)%10}/>
        </div>
    );
}

export default TopMenu;