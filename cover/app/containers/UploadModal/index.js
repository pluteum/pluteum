import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/common/Type/Typography';
import Modal from 'components/common/Modal/Modal';
import UploadZone from 'components/common/UploadZone';
import ProgressBar from 'components/common/ProgressBar';

export default function UploadModal({
  onUpload,
  uploadingFiles,
  ...modalProps
}) {
  return (
    <Modal {...modalProps}>
      <Typography type="SectionTitle">Upload files</Typography>
      {Object.keys(uploadingFiles).length === 0 && (
        <UploadZone onUpload={onUpload} />
      )}
      {Object.values(uploadingFiles).map(value => (
        <React.Fragment>
          <p key={value.name}>
            {value.error
              ? `Failed to upload ${value.name}: ${value.error.message}`
              : `Uploading ${value.name}`}
          </p>
          <ProgressBar error={!!value.error} percent={value.progress} />
        </React.Fragment>
      ))}
    </Modal>
  );
}

UploadModal.propTypes = {
  onUpload: PropTypes.func,
  uploadingFiles: PropTypes.object,
};
