export function parseCommand(msg) {
	var replies = [], gameset = {}, botset = {} ;
	if(msg[0] === '\\') {
		var command = msg.split(" ");
		if (command[0] === "\\help" && command.length===1){
			replies.push(
				"\\help [x]: details of command\n\n" +
				"\\hint [on/off]: toggle hint\n\n"+
				"\\show [on/off]: toggle show mine\n\n"
				// "\\diff [x]: change difficulty\n\n" +
				// "\\start: start bot\n\n" +
				// "\\speed [x]: change bot speed\n\n" +
				// "\\close: close chat"
			)
		} else if 	(command[0]=== "\\hint" && 
					(command[1]=== "on" || command[1]=== "off")){
			replies.push(`Hint is now turned ${command[1]}`);
			gameset["hint"] = command[1]==="on";
		} else if 	(command[0]=== "\\show" && 
					(command[1]=== "on" || command[1]=== "off")){
			replies.push(`Show Mines is now turned ${command[1]}`);
			gameset["show"] = command[1]==="on";
		} else replies.push("No such command!!");
	}
	return [replies, gameset, botset]
}