import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableLayout = styled.table`
  width: 100%;
  margin: 25px 0;
`;

const TableHeader = styled.thead`
  border-bottom: 2px solid #dbdde2;

  th {
    padding: 4px;
    text-align: left;
    font-family: 'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #494b4f;
    line-height: 22px;
  }
`;
const TableBody = styled.tbody`
  tr {
    height: 56px;
    background: #fff;
  }

  tr:nth-child(2n) {
    background: #f7f8fa;
  }

  td {
    font-family: 'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #494b4f;
    padding: 0 4px;
  }
`;

export default function Table({ tableProps }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableProps;

  return (
    <TableLayout {...getTableProps()}>
      <TableHeader>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </TableHeader>
      <TableBody {...getTableBodyProps()}>
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
      </TableBody>
    </TableLayout>
  );
}

Table.propTypes = {
  tableProps: PropTypes.object,
};
