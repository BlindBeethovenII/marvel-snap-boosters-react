import React, { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

const collectionStateJSON = require('./CollectionState.json');

// import logIfDevEnv from '../shared/logIfDevEnv';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // interesting parts of the CollectionState.json file
  const [timeUpdated] = useState(collectionStateJSON?.ServerState?.CardDefStats?.TimeUpdated);
  const [stats] = useState(collectionStateJSON?.ServerState?.CardDefStats?.Stats);
  const [cards] = useState(collectionStateJSON?.ServerState?.Cards);

  // ----------- //
  // the context //
  // ----------- //

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // collection state
    timeUpdated,
    stats,
    cards,
  }), [
    timeUpdated,
    stats,
    cards,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
