import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Tile } from './Tile.js';
import GameSelector from './GameSelector.js';
import { togglePiece, toggleMinePiece, youAreWinner, toggleFlag } from './redux/actions.js';
import { adjDirections, addTups } from './redux/board.js';

const mapStateToProps = store => {
  return store
}

function App({ board, mineTiles, gameOver, dispatch, revealedCount, youWon, playing, boardSize }) {

  const recursiveRevealer = (index) => {
    if (index === null || board[index[0]][index[1]].checked) {
      return;
    }
    dispatch(togglePiece(index))
    const tile = board[index[0]][index[1]];
    if (tile.adjacent > 0) {
      return;
    } else {
      for (let i = 0; i < adjDirections.length; i ++) {
        const adj = addTups(board, index, adjDirections[i]);
        if (adj) {
          recursiveRevealer(adj);
        }
      }
    }
  }
  
  const handlePieceToggle = (index) => {
    if (gameOver === false && youWon === false) {
      const tile = board[index[0]][index[1]];
      if (tile.mine) {
        for (let i = 0; i < mineTiles.length; i ++) {
          dispatch(toggleMinePiece(mineTiles[i]));
        }
      } else if (tile.adjacent === 0) {
        recursiveRevealer(index)
      } else {
        dispatch(togglePiece(index));
      }
    }
  }

  const checkBoardForWin = () => {
    if (boardSize !== 0 && revealedCount === (Math.pow(boardSize, 2) - boardSize)) {
      dispatch(youAreWinner());
    }
  }

  const handlePieceFlag = (index) => {
    dispatch(toggleFlag(index));
  }

  return (
    <div>
      { checkBoardForWin() }
      <h1>{gameOver || youWon ? null : 'Will You Be Mine-Sweeper?'}</h1>
      <h1>{gameOver ? 'You Lost 😭' : null}</h1>
      <h1>{youWon ? 'You Done Did It 😎' : null}</h1>
      <GameSelector />
      {playing && <div className="board-container">
        {board.map((row, i) => {
          return (
            <div key = {i} className="row" >
              {row.map((tile, j) => 
                <Tile 
                  handleClick={() => handlePieceToggle([i, j])} 
                  handleRightClick={() => handlePieceFlag([i, j])}
                  boardSize={boardSize}
                  key={j} data={tile}/>
                )}
            </div>
          )
        })}
      </div>}
    </div>
  );
}

export default connect(mapStateToProps)(App);