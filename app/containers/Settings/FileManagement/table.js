import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faSpinner,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

export function columnDef() {
  return [
    {
      Header: 'Filename',
      accessor: 'name',
    },
    {
      Header: '',
      accessor: 'processed',
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell }) => {
        if (!cell.value) {
          return <FontAwesomeIcon icon={faSpinner} />;
        }
        return <FontAwesomeIcon icon={faCheck} />;
      },
    },
    {
      Header: '',
      accessor: 'url',
      // eslint-disable-next-line react/prop-types
      Cell: ({ cell }) => {
        if (cell) {
          return (
            <a href={cell.value}>
              <FontAwesomeIcon icon={faFilePdf} />
            </a>
          );
        }
        return null;
      },
    },
  ];
}
