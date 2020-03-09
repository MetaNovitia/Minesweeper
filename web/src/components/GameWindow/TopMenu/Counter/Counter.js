import React from 'react';
import './Counter.css';

const seven_seg = {
    'a':[1,0,1,1,0,1,1,1,1,1],
    'b':[1,1,1,1,1,0,0,1,1,1],
    'c':[1,1,0,1,1,1,1,1,1,1],
    'd':[1,0,1,1,0,1,1,0,1,1],
    'e':[1,0,1,0,0,0,1,0,1,0],
    'f':[1,0,0,0,1,1,1,0,1,1],
    'g':[0,0,1,1,1,1,1,0,1,1]
};

function Segment(props) {

    var is_on = seven_seg[props.position][props.count] == 1 ? "On" : "Off";
    return (
        <div className={`Segment-${is_on} segment-${props.position}`} />
    );
}

function Counter(props) {

    var count=props.count;

    return (
        <div className="Counter">
            <Segment count={count} position={'a'}/>
            <Segment count={count} position={'b'}/>
            <Segment count={count} position={'c'}/>
            <Segment count={count} position={'d'}/>
            <Segment count={count} position={'e'}/>
            <Segment count={count} position={'f'}/>
            <Segment count={count} position={'g'}/>
        </div>
    );
}



export default Counter;