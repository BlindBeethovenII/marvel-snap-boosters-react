import React from 'react';

import { GameStateContextProvider } from './contexts/GameStateContext';

import LoadCollectionState from './components/LoadCollectionState';
import ShowUpgrades from './components/ShowUpgrades';
import CollectionStateTimeUpdated from './components/CollectionStateTimeUpdated';
import GitInfo from './components/GitInfo';

const App = () => (
  <GameStateContextProvider>
    <LoadCollectionState />
    <ShowUpgrades />
    <CollectionStateTimeUpdated />
    <GitInfo />
  </GameStateContextProvider>
);

export default App;
