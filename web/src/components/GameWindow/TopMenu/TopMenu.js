import React, { useState } from 'react';
import '../GameWindow.css';
import Counter from './Counter/Counter'

function TopMenu(props) {

    const [time, setTime] = useState(0);

	// increments timer per second
	var timerId=0;
	if(props.isStarted) {
		timerId = setTimeout(() => {
			setTime(Math.min(time+1,999));
		}, 1000);
	}

	console.log(timerId);

	function restart(){
		if(props.isStarted){
			clearTimeout(timerId);
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
							src={require(`../../../assets/${props.theme}/play.png`)} />
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