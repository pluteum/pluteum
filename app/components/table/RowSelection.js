import React from 'react';
import { useRowSelect } from 'react-table';
import Checkbox from 'components/form/input/Checkbox';

export default function addRowSelection() {
  return [
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // eslint-disable-next-line react/prop-types
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          // eslint-disable-next-line react/prop-types
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    },
  ];
}
