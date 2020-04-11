/**
 *
 * SettingsLibraryManagement
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Typography from 'components/common/Type/Typography';

import makeSelectLibraryManagement from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';

const Layout = styled.div`
  padding: 30px 25px;
  width: 100%;
`;

const SplitLayout = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 0 0 30px;

  > div {
    flex: 1 1 50%;
  }
`;

export function LibraryManagement() {
  useInjectReducer({ key: 'libraryManagement', reducer });
  useInjectSaga({ key: 'libraryManagement', saga });

  return (
    <Layout>
      <Helmet>
        <title>Library Management</title>
        <meta name="description" content="Description of Library Management" />
      </Helmet>
      <Typography type="SectionTitle">Library Management</Typography>
      <SplitLayout>
        <div>
          <Typography type="SettingsHeader">General Details</Typography>
          <Input label="Library Name" />
          <Input label="Library URL" />
        </div>
        <div>
          <Typography type="SettingsHeader">Upload Books</Typography>
          <Button>Upload Book</Button>
        </div>
      </SplitLayout>
      <div>
        <Typography type="SettingsHeader">Books</Typography>
      </div>
    </Layout>
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
