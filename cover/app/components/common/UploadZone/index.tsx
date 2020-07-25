import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { AnyStyledComponent } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import Button from 'components/form/Button';

const DropZone: AnyStyledComponent = styled.div`
  width: ${(props: any) => (props.vertical ? '100%' : '100%')};
  height: ${(props: any) => (props.vertical ? '100%' : '160px')};

  box-sizing: border-box;

  border: 2px solid #dbdde2;
  border-radius: 4px;
  border-style: dashed;
  outline: none;

  cursor: pointer;

  margin: ${(props: any) => (props.vertical ? '0 0' : '35px 0')};

  display: flex;
  justify-content: center;
  align-items: center;
  ${(props: any) => props.vertical && 'flex-direction: column;'};

  input {
    display: none;
  }

  div {
    padding: 15px 25px;
  }

  > div:first-of-type {
    text-align: ${(props: any) => (props.vertical ? 'center' : 'right')};
    border-right: ${(props: any) =>
      props.vertical ? '0' : '1px solid #dbdde2'};
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
`;

export default function UploadZone({
  header,
  subHeader,
  btnLabel = 'Choose files',
  onUpload,
  vertical,
  className = '',
}) {
  const onDrop = useCallback(acceptedFiles => onUpload(acceptedFiles), []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <DropZone className={className} vertical={vertical} {...getRootProps()}>
      <input
        aria-label="Upload Books"
        name="dropzone_input"
        type="file"
        {...getInputProps()}
      />
      <div>
        <h3>{header}</h3>
        <p>{subHeader}</p>
      </div>
      <div>
        <Button>{btnLabel}</Button>
      </div>
    </DropZone>
  );
}

UploadZone.propTypes = {
  onUpload: PropTypes.func,
};
