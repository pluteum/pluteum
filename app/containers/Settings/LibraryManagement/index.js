/**
 *
 * Library Management
 *
 */

import Typography from 'components/common/Type/Typography';
import BookUpload from 'containers/BookUpload/Loadable';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Input from '../../../components/common/Input/Input';
import ModalPortal from '../../../components/common/ModalPortal/ModalPortal';
import UploadButton from '../../../components/common/UploadButton/UploadButton';
import reducer from './reducer';
import saga from './saga';
import makeSelectLibraryManagement from './selectors';

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

  > div:first-child {
    padding-right: 20px;
  }

  > div:last-child {
    padding-left: 20px;
  }
`;

export function LibraryManagement() {
  useInjectReducer({ key: 'libraryManagement', reducer });
  useInjectSaga({ key: 'libraryManagement', saga });

  const [uploadModal, onUploadModal] = useState(false);
  const [files, onFilesChange] = useState([]);

  const onBookUploaded = e => {
    const fileList = e.target.files;

    onFilesChange(fileList);
    onUploadModal(true);
  };

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
          <UploadButton label="Upload Book" onUpload={onBookUploaded} />
        </div>
      </SplitLayout>
      <div>
        <Typography type="SettingsHeader">Books</Typography>
      </div>
      {uploadModal && (
        <ModalPortal>
          <BookUpload onExit={() => onUploadModal(false)} files={files} />
        </ModalPortal>
      )}
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
