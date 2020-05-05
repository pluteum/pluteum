import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

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
      Cell: ({ value }) => {
        console.log(value);
        return (
          <FontAwesomeIcon
            color={value ? '#494B4F' : '#D52020'}
            icon={value ? faCheckCircle : faExclamationCircle}
          />
        );
      },
    },
    {
      Header: 'Filetype',
      accessor: 'format',
      Cell: ({ value }) => String(value).toUpperCase(),
    },
  ];
}
