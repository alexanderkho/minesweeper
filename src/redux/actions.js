export function togglePiece (index) {
    return {
        type: 'TOGGLE_PIECE',
        payload: index
    }
}

export function toggleMinePiece (index) {
    return {
        type: 'TOGGLE_MINE_PIECE',
        payload: index
    }
}

export function youAreWinner() {
    return {
        type: 'WINNER'
    }
}

export function toggleFlag (index) {
    return {
        type: 'TOGGLE_FLAG',
        payload: index
    }
}