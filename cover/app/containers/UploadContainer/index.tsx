import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';

import ModalPortal from 'components/common/ModalPortal/ModalPortal';
import UploadModal from './UploadModal/UploadModal';
import { MUTATION, GET_FILES } from './queries';
import { uploadFiles, uploadFile, fileError } from 'actions/Upload';

export default function UploadContainer({
  openUpload,
  state,
  dispatch,
  onExit,
}) {
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
    dispatch(uploadFiles(files));

    files.forEach(file => {
      upload({
        variables: {
          file,
        },
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: ev =>
              dispatch(uploadFile({ progress: ev.loaded / ev.total, ...file })),
            onAbortPossible: () => undefined,
          },
        },
      }).catch(e => dispatch(fileError(file.path, e)));
    });
  }

  return (
    <React.Fragment>
      <ModalPortal>
        {openUpload && (
          <UploadModal
            files={state.files}
            errors={state.errors}
            totalProgress={state.total}
            onExit={onExit}
            onUpload={onUpload}
          />
        )}
      </ModalPortal>
    </React.Fragment>
  );
}

UploadContainer.propTypes = {
  openUpload: PropTypes.bool,
  onExit: PropTypes.func,
  state: PropTypes.object,
  dispatch: PropTypes.func,
};
