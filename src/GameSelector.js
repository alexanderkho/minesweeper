import React from 'react';
import { connect } from 'react-redux';
import { initGame } from './redux/actions';

const mapStateToProps = store => {
    return store
}

const GameSelector = ({ playing, dispatch }) => {
    if (playing) {
        return null
    } else {
        return (
            <div>
                <h3>Select A Difficulty:</h3>
                <button onClick={() => dispatch(initGame([10, 10]))}>Easy</button>
                <button onClick={() => dispatch(initGame([20, 50]))}>Medium</button>
                <button onClick={() => dispatch(initGame([30, 100]))}>Hard</button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(GameSelector);