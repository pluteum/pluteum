import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

import ModalPortal from 'components/common/ModalPortal/ModalPortal';
import UploadModal from './UploadModal';

const MUTATION = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      id
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
      image
      name
      url
      processed
    }
  }
`;

export default function UploadContainer({
  openUpload,
  onExit,
  onProgress,
  onError,
}) {
  const [uploadingFiles, updateUploadingFiles] = useState({});

  const [upload] = useMutation(MUTATION, {
    update(cache, { data }) {
      const { files } = cache.readQuery({ query: GET_FILES });
      cache.writeQuery({
        query: GET_FILES,
        data: { files: files.concat([data.uploadFile]) },
      });
    },
  });

  useEffect(() => {
    const files = Object.values(uploadingFiles);

    onError(files.some(file => file.error));

    if (files.length) {
      onProgress(files.reduce((acc, v) => acc + v.progress, 0) / files.length);
    }
  }, [uploadingFiles]);

  function onUpload(files) {
    files.forEach(file => {
      updateUploadingFiles(prevState =>
        produce(prevState, draftState => {
          // eslint-disable-next-line no-param-reassign
          draftState[file.name] = {
            name: file.name,
            size: file.size,
            progress: 0,
          };
        }),
      );

      upload({
        variables: {
          file,
        },
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: ev => {
              updateUploadingFiles(prevState =>
                produce(prevState, draftState => {
                  // eslint-disable-next-line no-param-reassign
                  draftState[file.name].progress = ev.loaded / ev.total;
                }),
              );
            },
            onAbortPossible: () => undefined,
          },
        },
      }).catch(e =>
        updateUploadingFiles(prevState =>
          produce(prevState, draftState => {
            // eslint-disable-next-line no-param-reassign
            draftState[file.name].error = e;
            // eslint-disable-next-line no-param-reassign
            draftState[file.name].progress = 1;
          }),
        ),
      );
    });
  }

  return (
    <React.Fragment>
      <ModalPortal>
        {openUpload && (
          <UploadModal
            onExit={onExit}
            onUpload={onUpload}
            uploadingFiles={uploadingFiles}
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
