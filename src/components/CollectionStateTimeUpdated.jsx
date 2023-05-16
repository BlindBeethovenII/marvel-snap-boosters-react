import React, { useContext } from 'react';
import moment from 'moment';

import GameStateContext from '../contexts/GameStateContext';

const left = 30;
const top = 30;

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '400px',
  height: '40px',
  fontWeight: 'italic',
  fontSize: '12px',
  textAlign: 'left',
  color: 'black',
};

const CollectionStateTimeUpdated = () => {
  const { collectionState } = useContext(GameStateContext);

  return (
    <div>
      <div style={divstyle}>{`CollectionState CardDefStats updated ${moment(collectionState.ServerState.CardDefStats.TimeUpdated).format('D MMM YYYY HH:MM')}`}</div>
    </div>
  );
};

export default CollectionStateTimeUpdated;
