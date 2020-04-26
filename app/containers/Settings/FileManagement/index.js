/**
 *
 * Files
 *
 */
import Typography from 'components/common/Type/Typography';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { columnDef } from './table';
import Table from '../../../components/Table';

const Layout = styled.div`
  padding: 30px 25px;
  width: 100%;
`;

const GET_FILES = gql`
  {
    files {
      id
      uuid
      image
      name
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

  const columns = React.useMemo(columnDef, []);
  const tableData = React.useMemo(() => files, [files]);

  const tableProps = useTable({ columns, data: tableData });

  return (
    <Layout>
      <Helmet>
        <title>File Management</title>
        <meta name="description" content="Description of File Management" />
      </Helmet>
      <Typography type="SectionTitle">File Management</Typography>
      <Table tableProps={tableProps} />
    </Layout>
  );
}

FileManagement.propTypes = {};

export default FileManagement;
