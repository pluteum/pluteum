import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/common/Type/Typography';
import UploadZone from 'components/common/UploadZone';

export default function UploadInput({ onUpload }) {
  return (
    <>
      <Typography type="SectionTitle">Upload files</Typography>
      <UploadZone onUpload={onUpload} />
    </>
  );
}

UploadZone.propTypes = {
  onUpload: PropTypes.func,
};
