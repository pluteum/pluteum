import Table from 'components/table';
import React from 'react';
import styled from 'styled-components';

import { columnDef } from './table';

const Layout = styled.div`
    padding: 10px;

    max-width: 1040px;
    margin: 40px auto;
`;

export default function FileDetails({ files }) {
  const TableColumns = React.useMemo(
    () => columnDef(),
    [],
  );

  const TableData = React.useMemo(() => files, [files]);
  
  return (
    <Layout>
      {files && <Table columns={TableColumns} data={TableData} />}
    </Layout>
  );
}
