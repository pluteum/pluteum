/**
 *
 * Library Management
 *
 */
import Typography from 'components/common/Type/Typography';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import TextInput from 'components/form/input/Text';

const Layout = styled.div`
  padding: 30px 25px;
  width: 100%;
`;

export function LibraryManagement() {
  return (
    <Layout>
      <Helmet>
        <title>Library Management</title>
        <meta name="description" content="Description of Library Management" />
      </Helmet>
      <Typography type="SectionTitle">Library Management</Typography>
      <div>
        <Typography type="SettingsHeader">General Details</Typography>
        <TextInput label="Library Name" />
        <TextInput label="Library URL" />
      </div>
    </Layout>
  );
}

LibraryManagement.propTypes = {};

export default memo(LibraryManagement);
