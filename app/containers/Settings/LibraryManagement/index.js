/**
 *
 * Library Management
 *
 */
import Typography from 'components/common/Type/Typography';
import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Input from '../../../components/common/Input/Input';
import ModalPortal from '../../../components/common/ModalPortal/ModalPortal';
import UploadButton from '../../../components/common/UploadButton/UploadButton';

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
  const [uploadModal, onUploadModal] = useState(true);

  const onBookUploaded = () => {
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
      {uploadModal && <ModalPortal />}
    </Layout>
  );
}

LibraryManagement.propTypes = {};

export default memo(LibraryManagement);
