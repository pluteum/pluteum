import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/common/Type/Typography';
import UploadZone from 'components/common/UploadZone';
import { ModalWrapper } from 'components/common/Modal/Modal';

export default function UploadInput({ onUpload }) {
  return (
    <ModalWrapper>
      <Typography type="SectionTitle">Upload files</Typography>
      <UploadZone onUpload={onUpload} />
    </ModalWrapper>
  );
}

UploadZone.propTypes = {
  onUpload: PropTypes.func,
};
