import React, { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

const collectionStateJSON = require('./CollectionState.json');

// import logIfDevEnv from '../shared/logIfDevEnv';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // collection state - loaded from CollectionState.json file
  const [collectionState] = useState(collectionStateJSON);

  // ----------- //
  // the context //
  // ----------- //

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // collection state
    collectionState,
  }), [
    collectionState,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
