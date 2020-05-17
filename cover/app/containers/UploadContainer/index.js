import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ModalPortal from 'components/common/ModalPortal/ModalPortal';
import UploadModal from '../UploadModal';

const MUTATION = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      id
      uuid
      image
      name
      url
      book {
        id
        title
      }
      processed
    }
  }
`;

const GET_FILES = gql`
  {
    files {
      id
      uuid
      image
      name
      url
      processed
    }
  }
`;

export default function UploadContainer({ openUpload, onExit, onProgress }) {
  const [uploadProgress, setProgress] = useState({});
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    const files = Object.values(uploadProgress);

    if (files.length) {
      onProgress(files.reduce((acc, v) => acc + v) / uploadCount);
    }
  }, [uploadProgress]);

  const [upload] = useMutation(MUTATION, {
    update(cache, { data }) {
      const { files } = cache.readQuery({ query: GET_FILES });
      cache.writeQuery({
        query: GET_FILES,
        data: { files: files.concat([data.uploadFile]) },
      });
    },
  });

  function onUpload(files) {
    setUploadCount(files.length);
    files.forEach(file => {
      upload({
        variables: {
          file,
        },
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: ev => {
              setProgress(prevState =>
                produce(prevState, draftState => {
                  // eslint-disable-next-line no-param-reassign
                  draftState[file.name] = ev.loaded / ev.total;
                }),
              );
            },
            onAbortPossible: () => undefined,
          },
        },
      });
    });
  }

  return (
    <React.Fragment>
      <ModalPortal>
        {openUpload && (
          <UploadModal
            onExit={onExit}
            onUpload={onUpload}
            uploadProgress={uploadProgress}
          />
        )}
      </ModalPortal>
    </React.Fragment>
  );
}

UploadContainer.propTypes = {
  openUpload: PropTypes.bool,
  onExit: PropTypes.func,
  onProgress: PropTypes.func,
};
