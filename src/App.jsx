import React from 'react';

import { GameStateContextProvider } from './contexts/GameStateContext';

import CollectionStateTimeUpdated from './components/CollectionStateTimeUpdated';
import GitInfo from './components/GitInfo';

const App = () => (
  <GameStateContextProvider>
    <CollectionStateTimeUpdated />
    <GitInfo />
  </GameStateContextProvider>
);

export default App;
