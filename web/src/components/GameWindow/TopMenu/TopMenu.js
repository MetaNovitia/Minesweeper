import React, { useState } from 'react';
import '../GameWindow.css';
import Counter from './Counter/Counter'

function TopMenu(props) {

    const [time, setTime] = useState(0);

	// increments timer per second
    let timerId = setTimeout(() => {
        setTime(Math.min(time+1,999));
    }, 1000);

    return (
        <div className="TopMenu game-background-original-inner">
            <CounterGroup count={props.number}/>
            <div style={{width:"600px"}}>
				<button className="PlayButton"/>
            </div>
            <CounterGroup count={time}/>
        </div>
    );
}

function CounterGroup(props) {
    return (
        <>
            <Counter count={Math.floor(props.count/100)%10}/>
            <Counter count={Math.floor(props.count/10)%10}/>
            <Counter count={Math.floor(props.count/1)%10}/>
        </>
    );
}

export default TopMenu;