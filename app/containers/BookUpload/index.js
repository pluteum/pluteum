/**
 *
 * BookUpload
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Modal from 'components/common/Modal/Modal';
import Typography from 'components/common/Type/Typography';

import makeSelectBookUpload from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function BookUpload({ onExit, files }) {
  useInjectReducer({ key: 'bookUpload', reducer });
  useInjectSaga({ key: 'bookUpload', saga });

  return (
    <Modal onExit={onExit}>
      <Typography type="SectionTitle">New Book</Typography>
    </Modal>
  );
}

BookUpload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onExit: PropTypes.func,
  files: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  bookUpload: makeSelectBookUpload(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BookUpload);
