export function randomMineGenerator(height, width, number) {

	var mines = [];
	var grid = emptyGrid(height, width);
	var i, row, col;

	for (i=0; i<number; i++){
		row = Math.floor(Math.random() * (height));
		col = Math.floor(Math.random() * (width));

		while (grid[row][col]===-1) {
			row = Math.floor(Math.random() * (height));
			col = Math.floor(Math.random() * (width));
		}

		mines.push([row,col]);
		grid[row][col] = -1;
	}

	fixCounts(grid);
	
	return grid;
}

export function emptyGrid(height, width) {
	var grid = [];
	for (var i=0; i<height; i++){
		grid.push([]);
		for(var j=0; j<width; j++){
			grid[i].push(0);
		}
	}
	return grid;
}

export function checkFlag(grid, state, row, col) {

	var tilesOpened = 0;
	var flagsAround = 0;
	var lost = false;

	var m, n, i, j;

	for (m=Math.max(row-1,0); m<Math.min(row+2,grid.length); m++){
		for (n=Math.max(col-1,0); n<Math.min(col+2,grid[0].length); n++){
			if (state[m][n] === 3) flagsAround+=1;
		}
	}

	if (flagsAround === grid[row][col]) {
		for (m=Math.max(row-1,0); m<Math.min(row+2,grid.length); m++){
			for (n=Math.max(col-1,0); n<Math.min(col+2,grid[0].length); n++){
				if (state[m][n] === 0 ){
					tilesOpened += openTile(grid, state, m, n);
					state[m][n] = 1;
					if (grid[m][n] === -1) {
						lost = true;
						grid[m][n] = -2;
					}
				}
			}
		}
	}

	return lost ? -1 : tilesOpened ;
}

export function openTile(grid, state, row, col) {
	// use bfs to open all 0 tiles and its surrounding
	if (grid[row][col] !== 0) return 1;

	var queue = [[row,col]];
	var i,j,m,n;
	var tilesOpened = 1;

	while (queue.length) {
		[i,j] = queue.shift();
		for (m=Math.max(i-1,0); m<Math.min(i+2,grid.length); m++){
			for (n=Math.max(j-1,0); n<Math.min(j+2,grid[0].length); n++){
				if (state[m][n] === 0){
					if (grid[m][n] === 0) 	
						queue.push([m,n]);
					state[m][n] = 1;
					tilesOpened += 1;
				}
			}
		}
	}

	return tilesOpened
}

export function fixCounts(grid) {
	for (var row=0; row<grid.length; row++){
		for(var col=0; col<grid[0].length; col++){

			if(grid[row][col]!==-1){

				grid[row][col] = 0;
				for(var i=Math.max(row-1,0); i<Math.min(row+2,grid.length); i++){
					for(var j=Math.max(col-1,0); j<Math.min(col+2,grid[0].length); j++){
						if(grid[i][j]===-1) grid[row][col] += 1;
					}
				}
			}
		}
	}
}