import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from 'components/common/Type/Typography';

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
      Cell: ({ value }) =>
        value || <Typography type="TextLink">Create Book</Typography>,
    },
    {
      Header: 'Status',
      accessor: 'processed',
      // eslint-disable-next-line react/prop-types
      Cell: ({ value }) => (
        <FontAwesomeIcon
          color={value ? '#494B4F' : '#D52020'}
          icon={value ? faCheckCircle : faExclamationCircle}
        />
      ),
    },
    {
      Header: 'Filetype',
      accessor: 'format',
      Cell: ({ value }) => String(value).toUpperCase(),
    },
  ];
}
