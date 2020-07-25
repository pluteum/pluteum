import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/common/Type/Typography';
import UploadZone from 'components/common/UploadZone';
import { ModalWrapper } from 'components/common/Modal/Modal';

export default function UploadInput({ onUpload }) {
  return (
    <ModalWrapper>
      <Typography type="SectionTitle">Upload files</Typography>
      <UploadZone
        header="Drag your files here"
        subHeader="You can upload .epub, .mobi, or .pdf files"
        onUpload={onUpload}
        vertical={false}
      />
    </ModalWrapper>
  );
}

UploadZone.propTypes = {
  onUpload: PropTypes.func,
};
