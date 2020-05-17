import React from 'react';

import { MoreHorizontal, AlertCircle, CheckCircle } from 'react-feather';

export function columnDef() {
  return [
    {
      Header: 'Filename',
      accessor: 'name',
    },
    {
      Header: 'Book',
      accessor: 'book',
      Cell: ({ value }) => value || 'Create Book',
    },
    {
      Header: 'Status',
      accessor: 'processed',
      // eslint-disable-next-line react/prop-types
      Cell: ({ value }) =>
        value ? (
          <CheckCircle color="#494B4F" />
        ) : (
          <AlertCircle color="#D52020" />
        ),
    },
    {
      Header: 'Filetype',
      accessor: 'format',
      Cell: ({ value }) => String(value).toUpperCase(),
    },
    {
      id: 'actions',
      Cell: v => <MoreHorizontal {...v} />,
      width: 50,
    },
  ];
}
