import React from 'react';
import styled from 'styled-components';

import { AlertCircle, CheckCircle, Loader, PauseCircle } from 'react-feather';

import ActionButton from 'components/table/ActionButton';

import { GET_FILES } from './queries';
import produce from 'immer';

const ActionItem = styled.button`
  appearance: none;
  background: none;
  border: 0;
  color: ${props => props.theme.colors.darkGrey};
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export function columnDef(reprocessFile, deleteFile) {
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
              deleteFile({
                variables: { id: parseInt(original.id, 10) },
                update: cache => {
                  const { files } = cache.readQuery({ query: GET_FILES });

                  const newFiles = produce(files, draft => {
                    draft.splice(draft.findIndex(v => v.id === original.id), 1);
                    return draft;
                  });

                  cache.writeQuery({
                    query: GET_FILES,
                    data: { files: newFiles },
                  });
                },
              })
            }
            type="button"
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
