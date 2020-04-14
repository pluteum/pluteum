/*
 * Ratings
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

export default function UploadButton({ label, onUpload }) {
  return (
    <React.Fragment>
      <Button as="label" htmlFor="fileupload">
        {label}
      </Button>
      <input
        type="file"
        id="fileupload"
        name="fileupload"
        style={{ display: 'none' }}
        onChange={e => onUpload(e)}
      />
    </React.Fragment>
  );
}

UploadButton.propTypes = {
  label: PropTypes.string,
  onUpload: PropTypes.func.isRequired,
};
