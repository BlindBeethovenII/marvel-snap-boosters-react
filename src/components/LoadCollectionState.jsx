import React, { useContext } from 'react';

import {useDropzone} from 'react-dropzone';

import GameStateContext from '../contexts/GameStateContext';

const LoadCollectionState = () => {
  const { loaded, setLoaded, setTimeUpdated, setStats, setCards } = useContext(GameStateContext);

  const reader = new FileReader();
  reader.onload = () => {
    const collectionStateJSON = JSON.parse(reader.result);
    console.log(collectionStateJSON);
    setTimeUpdated(collectionStateJSON?.ServerState?.CardDefStats?.TimeUpdated);
    setStats(collectionStateJSON?.ServerState?.CardDefStats?.Stats);
    setCards(collectionStateJSON?.ServerState?.Cards);
    setLoaded(true);
  };

  const {
    // acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: { 'application/json': [] },
    maxFiles: 1,
    multiple: false,
    onDropAccepted: (files) => {
      files.forEach(file => {
        console.log(`onDropAccepted got ${file.name}`);
        reader.readAsText(file);
      });
    },
  });

  if (loaded) {
    return null;
  }

  // const acceptedFileItems = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div>
      <p>This is a basic web app that analyses a Marvel Snap CollectionState.json file to determine the card upgrades available given the card boosters available.</p>
      <p>To see the analysis, you need to load the CollectionState.json file from the game.</p>
      <p>I play on Android, and I can reach my CollectionState.json file by connecting my Android device to my desktop, running this web app in a browser on my desktop and then selecting the file "\Internal storage\Android\data\com.nvsgames.snap\files\Standalone\States\nvprod\CollectionState.json"</p>
      <p>If I run the web app in a browser on my Android device then I cannot see the folder the CollectionState.json file is in.</p>
      <p>If you load the wrong JSON file you should see an error message indicating the content is unexpected.</p>
      <p>The analysis takes no notice of the credits you actually have (those are held in another JSON file).</p>
      <p>[This web (React) app is very basic - and I'm nearly too embarrassed to share it, given I've been programming over 40 years...but it seems to work as intended.]</p>
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop the CollectionState.json file here, or click to select that file</p>
        </div>
        <aside>
          <p>If the load failed, then you might see an error message here:</p>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </section>
    </div>
  );
};

export default LoadCollectionState;
