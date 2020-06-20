import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const DropZone = styled.div`
  width: 100%;
  height: 160px;

  border: 2px solid #dbdde2;
  border-radius: 4px;
  border-style: dashed;
  outline: none;

  margin: 35px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  input {
    display: none;
  }

  div {
    padding: 15px 25px;
  }

  > div:first-of-type {
    text-align: right;
    border-right: 1px solid #dbdde2;
  }

  h3 {
    margin: 0;
    font-family: 'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #0a4fcd;
  }

  p {
    margin: 0;
    font-family: 'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
    font-size: 16px;
    color: #494b4f;
    line-height: 24px;
  }

  button {
    background: #eff1f7;
    border: 0;
    font-weight: 500;
    border-radius: 20px;
    -webkit-appearance: none;
    outline: none;
    font-family: 'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
    font-size: 16px;
    color: #65676c;
    text-align: center;
    padding: 10px 25px;
    cursor: pointer;
  }
`;

export default function UploadZone({ onUpload }) {
  const onDrop = useCallback(acceptedFiles => onUpload(acceptedFiles), []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <DropZone {...getRootProps()}>
      <input
        aria-label="Upload Books"
        name="dropzone_input"
        type="file"
        {...getInputProps()}
      />
      <div>
        <h3>Drag your files here</h3>
        <p>You can upload .epub, .mobi, or .pdf files</p>
      </div>
      <div>
        <button type="button">Choose files</button>
      </div>
    </DropZone>
  );
}

UploadZone.propTypes = {
  onUpload: PropTypes.func,
};
