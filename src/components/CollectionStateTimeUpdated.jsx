import React, { useContext } from 'react';
import moment from 'moment';

import GameStateContext from '../contexts/GameStateContext';

const divstyle = {
  whiteSpace: 'pre-line',
};

const CollectionStateTimeUpdated = () => {
  const { timeUpdated } = useContext(GameStateContext);

  if (!timeUpdated) {
    // we are not loaded yet - so show nothing
    return null;
  }

  return (
    <div style={divstyle}>{`\nCollectionState CardDefStats updated ${moment(timeUpdated).format('D MMM YYYY HH:MM')}`}</div>
  );
};

export default CollectionStateTimeUpdated;
