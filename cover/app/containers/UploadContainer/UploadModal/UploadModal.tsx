import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/common/Type/Typography';
import Modal from 'components/common/Modal/Modal';
import UploadZone from 'components/common/UploadZone';
import ProgressBar from 'components/common/ProgressBar';

export default function UploadModal({ uploadingFiles, ...modalProps }) {
  return <Modal {...modalProps} />;
}

UploadModal.propTypes = {
  onUpload: PropTypes.func,
  uploadingFiles: PropTypes.object,
};
