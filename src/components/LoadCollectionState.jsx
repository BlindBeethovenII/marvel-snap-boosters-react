import React, { useContext } from 'react';

import GameStateContext from '../contexts/GameStateContext';

const divstyle = {
  whiteSpace: 'pre-line',
};

const LoadCollectionState = () => {
  const { loaded } = useContext(GameStateContext);

  if (loaded) {
    return null;
  }

  return (
    <div style={divstyle}>{`\nTODO Load`}</div>
  );
};

export default LoadCollectionState;
