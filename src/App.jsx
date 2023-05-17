import React from 'react';

import { GameStateContextProvider } from './contexts/GameStateContext';

import ShowUpgrades from './components/ShowUpgrades';
import CollectionStateTimeUpdated from './components/CollectionStateTimeUpdated';
import GitInfo from './components/GitInfo';

const App = () => (
  <GameStateContextProvider>
    <ShowUpgrades />
    <CollectionStateTimeUpdated />
    <GitInfo />
  </GameStateContextProvider>
);

export default App;
