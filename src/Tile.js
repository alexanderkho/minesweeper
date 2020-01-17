import React from 'react';

export const Tile = ({ data, handleClick, handleRightClick, boardSize }) => {
    const tileDisplay = data.checked === false ? data.flagged? '🏴‍☠️' : '' :
        data.mine ? '💔' : data.adjacent > 0 ? data.adjacent : '';

    const tileClass = data.checked === false ? data.flagged ? ' flagged' : '' :
        data.mine ? ' mine' : ' active';

    const tileSize = boardSize === 10 ? '' : boardSize === 20 ? ' med' : ' lg';
    
    const handleContext = (e) => {
        e.preventDefault();
        handleRightClick();
    }
    return <div className={'tile' + tileClass + tileSize} onClick={handleClick} onContextMenu={handleContext}>{tileDisplay} </div>
}