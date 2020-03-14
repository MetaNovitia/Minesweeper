export function parseCommand(command) {
	if(command[0] === '\\') {
		if (command === "\\help"){
			return [[
				"\\help [x]: details of command\n\n" +
				"\\diff [x]: change difficulty\n\n" +
				"\\start: start bot\n\n" +
				"\\speed [x]: change bot speed\n\n" +
				"\\close: close chat"
			], []]
		}
		return [["No such command!!"],[]]
	}
	return [[],[]]
}