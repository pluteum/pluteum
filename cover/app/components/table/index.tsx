import React from 'react';
import { useTable } from 'react-table';
import PropTypes from 'prop-types';
import { StyledTable, StyledHeaderRow, StyledRow } from './styles';
import HeaderCell from './HeaderCell';
import addRowSelection from './RowSelection';

export default function Table({ columns, data, rowSelection }) {
  const plugins = [];

  if (rowSelection) {
    plugins.push(...addRowSelection());
  }

  const tableProps = useTable({ columns, data }, ...plugins);

  return (
    <StyledTable {...tableProps.getTableProps()}>
      <thead>
        {tableProps.headerGroups.map(headerGroup => (
          <StyledHeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <HeaderCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </HeaderCell>
            ))}
          </StyledHeaderRow>
        ))}
      </thead>
      <tbody {...tableProps.getTableBodyProps()}>
        {tableProps.rows.map(row => {
          tableProps.prepareRow(row);
          return (
            <StyledRow {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </StyledRow>
          );
        })}
      </tbody>
    </StyledTable>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  rowSelection: PropTypes.bool,
};
