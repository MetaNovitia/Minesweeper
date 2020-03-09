import React, { useRef, useState } from 'react';
import '../GameWindow.css';
import Counter from './Counter/Counter'

function TopMenu() {

    const [count, setCount] = useState(0);

    let timerId = setTimeout(() => {
        setCount(count+1);
    }, 1000);

    return (
        <div className="TopMenu game-background-original-inner">
            <Counter count={0}/>
            <Counter count={1}/>
            <Counter count={2}/>
            <div style={{width:"600px"}}>

            </div>
            <Counter count={Math.floor(count/100)%10}/>
            <Counter count={Math.floor(count/10)%10}/>
            <Counter count={Math.floor(count/1)%10}/>
        </div>
    );
}

export default TopMenu;