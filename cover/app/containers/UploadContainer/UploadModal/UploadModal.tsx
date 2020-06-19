import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/common/Modal/Modal';
import IconButton from 'components/common/IconButton';
import { Maximize2, X } from 'react-feather';
import UploadInput from './components/UploadInput';
import UploadProgress from './components/UploadProgress';

export default function UploadModal({ onUpload, uploadingFiles = [], onExit }) {
  const [expandUploads, setExpandUploads] = useState(false);

  const actions = [
    <IconButton tooltip="View total file upload progress">
      <Maximize2 onClick={() => setExpandUploads(!expandUploads)} size={18} />
    </IconButton>,
    <IconButton onClick={onExit}>
      <X size={18} />
    </IconButton>,
  ];

  const isUploading = Object.keys(uploadingFiles).length === 0;

  return (
    <Modal onExit={onExit} actions={isUploading ? [actions[1]] : actions}>
      {isUploading && <UploadInput onUpload={onUpload} />}
      {!isUploading && (
        <UploadProgress uploadingFiles={uploadingFiles} onMinimize={onExit} />
      )}
    </Modal>
  );
}

UploadModal.propTypes = {
  onUpload: PropTypes.func,
  uploadingFiles: PropTypes.array,
};
