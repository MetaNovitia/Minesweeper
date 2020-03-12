export function parseCommand(command) {
	if(command[0] === '\\') {
		if (command === "\\help"){
			return [[
				"\\help [x]: details of command x\n\n" +
				"\\diff [x]: change difficulty"
			], []]
		}
		return [["No such command"],[]]
	}
	return [[],[]]
}