import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/common/Modal/Modal';
import IconButton from 'components/common/IconButton';
import { Maximize2, X } from 'react-feather';
import UploadInput from './components/UploadInput';
import UploadProgress from './components/UploadProgress';

export default function UploadModal({
  files,
  errors,
  totalProgress,
  onUpload,
  onExit,
}) {
  const [expandUploads, setExpandUploads] = useState(false);

  const actions = [
    <IconButton
      onClick={() => setExpandUploads(!expandUploads)}
      tooltip="View total file upload progress"
    >
      <Maximize2 size={18} />
    </IconButton>,
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
