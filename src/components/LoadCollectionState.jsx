import React, { useContext } from 'react';

import {useDropzone} from 'react-dropzone';

import GameStateContext from '../contexts/GameStateContext';

const LoadCollectionState = () => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: { 'application/json': [] },
    maxFiles: 1,
    multiple: false,
  });

  const { loaded } = useContext(GameStateContext);

  if (loaded) {
    return null;
  }

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

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
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop the CollectionState.json file here, or click to select that file</p>
        <em>(Only 1 json file will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
};

export default LoadCollectionState;
