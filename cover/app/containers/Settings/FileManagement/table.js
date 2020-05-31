import React from 'react';
import styled from 'styled-components';

import { AlertCircle, CheckCircle } from 'react-feather';

import ActionButton from 'components/table/ActionButton';

const ActionItem = styled.button`
  appearance: none;
  background: none;
  border: 0;
  color: ${props => props.theme.colors.darkGrey};
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${props =>
      props.danger ? props.theme.colors.red : props.theme.colors.primary};
  }
`;

export function columnDef(reprocessFile, deleteFile, client) {
  return [
    {
      Header: 'Filename',
      accessor: 'name',
    },
    {
      Header: 'Book',
      accessor: 'book',
      Cell: ({ value }) => (value && value.title) || 'Create Book',
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
      // eslint-disable-next-line react/prop-types
      Cell: ({ row: { original } }) => {
        const options = [
          <ActionItem
            onClick={() =>
              reprocessFile({ variables: { id: parseInt(original.id, 10) } })
            }
            type="button"
          >
            Reprocess File
          </ActionItem>,
          <ActionItem
            onClick={() =>
              deleteFile({ variables: { id: parseInt(original.id, 10) } }).then(
                client.cache.evict(`File:${original.id}`),
              )
            }
            type="button"
            danger
          >
            Delete File
          </ActionItem>,
        ];
        return <ActionButton options={options} />;
      },
      width: 50,
    },
  ];
}
