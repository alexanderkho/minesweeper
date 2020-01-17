import { makeBoard, updateTile } from './board.js';

let newBoard = makeBoard(10);

const initialState = {
    board: newBoard[0],
    mineTiles: newBoard[1],
    gameOver: false,
    youWon: false,
    revealedCount: 0
}

const rootReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case 'TOGGLE_PIECE':
            newState = {
                ...state, 
                board: updateTile(state.board, action.payload, 'checked', true),
                revealedCount: state.revealedCount + 1
            }
            break;
        case 'TOGGLE_MINE_PIECE':
            newState = {
                ...state, 
                board: updateTile(state.board, action.payload, 'checked', true), 
                gameOver: true,
                revealedCount: state.revealedCount + 1
            }
            break;
        case 'TOGGLE_FLAG': 
            const currentFlagState = state.board[action.payload[0]][action.payload[1]].flagged;
            console.log(currentFlagState);
            newState = {
                ...state,
                board: updateTile(state.board, action.payload, 'flagged', !currentFlagState)
            }
            break;
        case 'WINNER':
            newState = {...state, youWon: true};
            break;
        default:
            newState = state;
    }
    return newState;
}

export default rootReducer;