import { makeBoard, updateTile } from './board.js';

// let newBoard = makeBoard(10);

const initialState = {
    playing: false,
    board: null,
    boardSize: 0,
    mineTiles: null,
    gameOver: false,
    youWon: false,
    revealedCount: 0
}

const rootReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case 'INIT_GAME':
            const board = makeBoard(...action.payload);
            newState = {
                ...state,
                playing: true,
                board: board[0],
                mineTiles: board[1],
                boardSize: action.payload[0]
            }
            break;
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