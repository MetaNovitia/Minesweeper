export function randomMineGenerator(height, width, number) {

	var mines = [];
	var grid = [];
	var i, j, row, col;

	for (i=0; i<height; i++){
		grid.push([]);
		for(j=0; j<width; j++){
			grid[i].push(0);
		}
	}

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