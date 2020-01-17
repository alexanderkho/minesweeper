import React from 'react';

export const Tile = ({ data, handleClick, handleRightClick }) => {
    const tileDisplay = data.checked === false ? data.flagged? '🏴‍☠️' : '' :
        data.mine ? '💔' : data.adjacent > 0 ? data.adjacent : '';
        
    const tileClass = data.checked === false ? data.flagged ? ' flagged' : '' :
        data.mine ? ' mine' : ' active';
    
    const handleContext = (e) => {
        e.preventDefault();
        handleRightClick();
    }
    return <div className={'tile' + tileClass} onClick={handleClick} onContextMenu={handleContext}>{tileDisplay} </div>
}