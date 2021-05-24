import IconButton from 'components/common/IconButton';
import ActionButton from 'components/table/ActionButton';
import React from 'react';
import { Loader, AlertCircle, CheckCircle, PauseCircle } from 'react-feather';
import styled from 'styled-components';

const ActionItem: any = styled.button`
  appearance: none;
  background: none;
  border: 0;
  color: ${(props: any) =>
    props.danger ? props.theme.colors.red : props.theme.colors.darkGrey};
  cursor: pointer;
  outline: none;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export function columnDef(showScan) {
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
        if (value.some(scan => scan.finishedAt && !scan.error)) {
          return <CheckCircle color="#494B4F" />;
        } else if (value.some(scan => scan.error)) {
          return <AlertCircle color="#D52020" />;
        } else if (value.some(scan => scan.queuedAt && !scan.finishedAt)) {
          return <Loader />;
        }

        return <PauseCircle />;
      },
    },
    {
      id: 'actions',
      // eslint-disable-next-line react/prop-types
      Cell: ({ row: { original } }) => {
        const options = [
          <ActionItem type="button" onClick={() => showScan(original)}>
            View File Scans
          </ActionItem>,
          <ActionItem type="button">Convert File</ActionItem>,
          <ActionItem type="button">Detach File</ActionItem>,
          <ActionItem type="button" danger>
            Delete File
          </ActionItem>,
        ];

        return <ActionButton options={options} />;
      },
      width: 50,
    },
  ];
}
