/**
 *
 * Files
 *
 */
import Typography from 'components/common/Type/Typography';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { columnDef } from './table';

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
  const { data: { files = [] } = {} } = useQuery(GET_FILES);

  const columns = React.useMemo(columnDef, []);
  const tableData = React.useMemo(() => files, [files]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  return (
    <Layout>
      <Helmet>
        <title>File Management</title>
        <meta name="description" content="Description of File Management" />
      </Helmet>
      <Typography type="SectionTitle">File Management</Typography>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}

FileManagement.propTypes = {};

export default memo(FileManagement);
