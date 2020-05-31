/**
 *
 * Files
 *
 */
import Typography from 'components/common/Type/Typography';
import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-apollo';

import Table from 'components/table';

import { GET_FILES, REPROCESS_FILE, DELETE_FILE } from './queries';
import { columnDef } from './table';

const Layout = styled.div`
  padding: 30px 25px;
  width: 100%;
`;

export function FileManagement() {
  const { data: { files = [] } = {} } = useQuery(GET_FILES, {
    fetchPolicy: 'cache-and-network',
  });

  const [reprocessFile] = useMutation(REPROCESS_FILE);
  const [deleteFile, { client }] = useMutation(DELETE_FILE);

  const TableColumns = React.useMemo(
    () => columnDef(reprocessFile, deleteFile, client),
    [],
  );
  const TableData = React.useMemo(() => files, [files]);

  return (
    <Layout>
      <Helmet>
        <title>File Management</title>
        <meta name="description" content="Description of File Management" />
      </Helmet>
      <Typography type="SectionTitle">Manage Files</Typography>
      <Table columns={TableColumns} data={TableData} rowSelection />
    </Layout>
  );
}

export default FileManagement;
