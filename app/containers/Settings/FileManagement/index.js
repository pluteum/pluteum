/**
 *
 * Files
 *
 */
import Typography from 'components/common/Type/Typography';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Layout = styled.div`
  padding: 30px 25px;
  width: 100%;
`;

export function FileManagement() {
  return (
    <Layout>
      <Helmet>
        <title>File Management</title>
        <meta name="description" content="Description of File Management" />
      </Helmet>
      <Typography type="SectionTitle">File Management</Typography>
    </Layout>
  );
}

FileManagement.propTypes = {};

export default memo(FileManagement);
