/**
 *
 * Files
 *
 */
import Typography from 'components/common/Type/Typography';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Table from 'components/table';
import Filter from 'components/table/Filter';

import { columnDef } from './table';

const Layout = styled.div`
  padding: 30px 25px;
  width: 100%;
`;

const GET_FILES = gql`
  {
    files {
      id
      name
      format
      url
      book {
        id
        title
      }
      processed
    }
  }
`;

export function FileManagement() {
  const { data: { files = [] } = {} } = useQuery(GET_FILES, {
    fetchPolicy: 'cache-and-network',
  });

  const TableColumns = React.useMemo(columnDef, []);
  const TableData = React.useMemo(() => files, [files]);

  return (
    <Layout>
      <Helmet>
        <title>File Management</title>
        <meta name="description" content="Description of File Management" />
      </Helmet>
      <Typography type="SectionTitle">Manage Files</Typography>
      <Filter
        defaultOptions={['Processing', 'Failed']}
        options={['Finished', 'Processing', 'Failed']}
      />
      <Table columns={TableColumns} data={TableData} rowSelection />
    </Layout>
  );
}

FileManagement.propTypes = {};

export default FileManagement;
