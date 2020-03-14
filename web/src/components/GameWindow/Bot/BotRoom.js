import React, {useState} from 'react';
import './Bot.css';
import '../GameWindow.css';
import {parseCommand} from './compiler';
// import {countSafe} from '../GameWindow/mineGenerator';

const initialBotSettings = {
	clickSpeed: 0.5,
	certainty: 100,
	moveSpeed: 0.2,
	icon: "original"
}

function BotRoom(props) {

	const botsettings = useState(initialBotSettings)[0];
	const [chatlog, setChatLog] = useState([]);
	const [temp, flush] = useState(false);
	const [ref, setRef] = useState(false);

	console.log(temp, ref)

	function keyPress(evt) {
		if(evt.keyCode===13 && evt.target.value!=="") {
			chatlog.push([evt.target.value, "User"]);

			var [replies, data] = parseCommand(evt.target.value);
			for (var i in replies) chatlog.push([replies[i], "Bot"])

			evt.target.value = "";


			flush(true);
		}
	}

	// get it to render before scrolling
	if (ref && temp) {
		var obj = document.getElementById("ChatLog");
		obj.scrollTo(0,obj.scrollHeight);
		flush(false)
		setRef(false);
	}

	return (
		<div className={`BotRoom game-background-outer-${props.theme}`} 
			onDragStart={()=>{

			}}>
			<div className={`BotChat game-background-inner-${props.theme}`}>
				<div className={"ChatLogContainer"}>
					<ul id="ChatLog" className={`ChatLog`}>
						{chatlog.map((val, ind)=>
							<li 
								ref={(ref)=>{if(temp && ind===chatlog.length-1){
									setRef(ref);
								}}}
								key={`message-${ind}`}
								className={`${val[1]}Text`}>
								{val[0]}</li>
						)}
					</ul>
				</div>
				<input 
					id = "messagebox"
					onKeyDown={keyPress}
					placeholder="\help for commands" className={`MessageBox`} />
			</div>
		</div>
	);
}

export default BotRoom;
