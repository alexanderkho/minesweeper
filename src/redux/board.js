const makeBoard = (n) => {
    //Tile Template
    let tile = {
        size: n, //nxn board
        mine: false,
        checked: false,
        flagged: false,
        adjacent: 0
    }
    
    //Initialize board
    let board = [];
    for (let i = 0; i < n; i ++) {
        let row = [];
        for (let j = 0; j < n; j ++) {
            row.push({...tile});
        }
        board.push(row);
    }
    
    //Place 10 random mines and store mineTiles
    let mineTiles = [];
    for (let i = 0; i < n; i ++) {
        let placed = false;
        while (placed === false) {
            let randomRow = Math.floor(Math.random() * n);
            let randomCol = Math.floor(Math.random() * n);
            if (board[randomRow][randomCol].mine === false) {
                board[randomRow][randomCol].mine = true;
                placed = true;
                mineTiles.push([randomRow, randomCol]);
            }
        }
    }
    
    //Calculate Adjacent Values:
    //Jump to each mine in mine tiles
    //for each one, loop through all surrounding tiles and increment adjacent count (if not a mine)
    for (let i = 0; i < mineTiles.length; i ++) {
        const currentMine = mineTiles[i];
        for (let j = 0; j < adjDirections.length; j ++) {
            const adjTile = addTups(board, currentMine, adjDirections[j]);
            if (adjTile) {
                board[adjTile[0]][adjTile[1]].adjacent ++;
            }
        }
    }
    return [board, mineTiles];
}


/*HELPER FUNCTIONS*/

//add two tuples
const addTups = (board, tup1, tup2) => {
    const res = [tup1[0] + tup2[0], tup1[1] + tup2[1]];
    if (res[0] < board.length && res[0] > -1 && res[1] < board.length && res[1] > -1) {
        return res;
    }
    return null;
}

//tuples representing possible directions
const adjDirections = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

//Update any tile without mutating board
const updateTile = (board, index, prop, newVal) => {
    let newBoard = [...board];
    let newRow = [...board[index[0]]];
    let tile = newRow[index[1]];
    tile[prop] = newVal;
    newBoard[index[0]] = newRow;
    return newBoard;
}

/*EXPORTS*/
export { makeBoard, adjDirections, addTups, updateTile };


// // //Print out Board
// let boardStr = '';
// for (let i = 0; i < 10; i ++) {
//     const row = board[i];
//     for (let j = 0; j < 10; j ++) {
//         if (row[j].mine) {
//             boardStr += '* ';
//         } else {
//             boardStr += row[j].adjacent + ' ';
//         }
//     }
//     boardStr += '\n';
// }
// console.log(boardStr);



