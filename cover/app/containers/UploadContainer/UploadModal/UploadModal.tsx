import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/common/Modal/Modal';
import IconButton from 'components/common/IconButton';
import { Maximize2, X } from 'react-feather';
import UploadInput from './components/UploadInput';
import UploadProgress from './components/UploadProgress';
import Tooltip from 'components/Tooltip';

export default function UploadModal({
  files,
  errors,
  totalProgress,
  onUpload,
  onExit,
}) {
  const [expandUploads, setExpandUploads] = useState(false);

  const actions = [
    <Tooltip placement="bottom" content="View individual file upload progress">
      <IconButton onClick={() => setExpandUploads(!expandUploads)}>
        <Maximize2 size={18} />
      </IconButton>
    </Tooltip>,
    <IconButton onClick={onExit}>
      <X size={18} />
    </IconButton>,
  ];

  const isUploading = files.size === 0;

  return (
    <Modal onExit={onExit} actions={isUploading ? [actions[1]] : actions}>
      {isUploading && <UploadInput onUpload={onUpload} />}
      {!isUploading && (
        <UploadProgress
          expanded={expandUploads}
          files={files}
          errors={errors}
          totalProgress={totalProgress}
          onMinimize={onExit}
        />
      )}
    </Modal>
  );
}

UploadModal.propTypes = {
  onUpload: PropTypes.func,
  uploadingFiles: PropTypes.array,
};
