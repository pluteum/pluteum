import IconButton from 'components/common/IconButton';
import React from 'react';
import { Loader, AlertCircle, CheckCircle, PauseCircle, MoreVertical } from 'react-feather';

export function columnDef() {
  return [
    {
      Header: 'Filename',
      accessor: 'name',
    },
    {
      Header: 'Size',
      accessor: 'size',
    },    
    {
      Header: 'Filetype',
      accessor: 'format',
      Cell: ({ value }) => String(value).toUpperCase(),
    },
    {
      Header: 'Processed',
      accessor: 'scans',
      // eslint-disable-next-line react/prop-types
      Cell: ({ value = [] }) => {
        if (value.some((scan) => scan.finishedAt)) {
          return <CheckCircle color="#494B4F" />;
        } else if (value.some((scan) => scan.error)) {
          return <AlertCircle color="#D52020" />;
        } else if (value.some((scan) => scan.queuedAt && !scan.finishedAt)) {
          return <Loader />;
        }

        return <PauseCircle />;
      },
    },
    {
      id: 'actions',
      // eslint-disable-next-line react/prop-types
      Cell: ({ row: { original } }) => {
        return <IconButton><MoreVertical /></IconButton>
      },
      width: 50,
    },
  ];
}
