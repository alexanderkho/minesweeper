import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Tile } from './Tile.js';
import { togglePiece, toggleMinePiece, youAreWinner, toggleFlag } from './redux/actions.js';
import { adjDirections, addTups } from './redux/board.js';

const mapStateToProps = store => {
  return store
}

function App({ board, mineTiles, gameOver, dispatch, revealedCount, youWon }) {

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
    if (revealedCount === 90) {
      dispatch(youAreWinner());
    }
  }

  const handlePieceFlag = (index) => {
    dispatch(toggleFlag(index));
  }

  return (
    <div>
      { checkBoardForWin() }
      <h1>Will You Be Mine-Sweeper?</h1>
      <h2>{gameOver ? 'You Lost 😭' : null}</h2>
      <h2>{youWon ? 'You Done Did It 😎' : null}</h2>
      <div className="board-container">
        {board.map((row, i) => {
          return (
            <div key = {i} className="row" >
              {row.map((tile, j) => 
                <Tile 
                  handleClick={() => handlePieceToggle([i, j])} 
                  handleRightClick={() => handlePieceFlag([i, j])}
                  key={j} data={tile}/>
                )}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);