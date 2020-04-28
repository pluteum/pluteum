import React, { useState } from 'react';
import produce from 'immer';
import Typography from 'components/common/Type/Typography';
import Modal from 'components/common/Modal/Modal';
import UploadZone from 'components/common/UploadZone';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ProgressBar from 'components/common/ProgressBar';
const MUTATION = gql`
  mutation($file: FileUpload!) {
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
export default function UploadModal({ ...modalProps }) {
  const [uploadProgress, setProgress] = useState({});

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
    <Modal {...modalProps}>
      <Typography type="SectionTitle">Upload files</Typography>
      {Object.keys(uploadProgress).length === 0 && (
        <UploadZone onUpload={onUpload} />
      )}
      {Object.entries(uploadProgress).map(([key, value]) => (
        <React.Fragment>
          <p key={key}>Uploading {key}</p>
          <ProgressBar percent={value} />
        </React.Fragment>
      ))}
    </Modal>
  );
}
