import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/common/Type/Typography';
import Modal from 'components/common/Modal/Modal';
import UploadZone from 'components/common/UploadZone';
import ProgressBar from 'components/common/ProgressBar';

export default function UploadModal({
  onUpload,
  uploadProgress,
  ...modalProps
}) {
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

UploadModal.propTypes = {
  onUpload: PropTypes.func,
  uploadProgress: PropTypes.object,
};
