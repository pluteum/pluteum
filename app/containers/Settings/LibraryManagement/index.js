/**
 *
 * SettingsLibraryManagement
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLibraryManagement from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function LibraryManagement() {
  useInjectReducer({ key: 'libraryManagement', reducer });
  useInjectSaga({ key: 'libraryManagement', saga });

  return (
    <div>
      <Helmet>
        <title>Library Management</title>
        <meta name="description" content="Description of Library Management" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

LibraryManagement.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingsLibraryManagement: makeSelectLibraryManagement(),
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

export default compose(
  withConnect,
  memo,
)(LibraryManagement);
