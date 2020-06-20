import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';

import UploadContainer from '../index';
import { MUTATION } from '../queries';

const mocks = [
  {
    request: {
      query: MUTATION,
      variables: {
        file: new File([], 'test.pdf'),
      },
    },
    result: {
      data: {
        uploadFile: {
          id: 1,
          image: null,
          name: 'test.pdf',
          url: 'pluteum.io/files/test.pdf',
          book: null,
          processed: false,
        },
      },
    },
  },
];

// eslint-disable-next-line react/prop-types
const ProviderWrapper = ({ children }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <MemoryRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MemoryRouter>
  </MockedProvider>
);

describe('<UploadContainer />', () => {
  it('will dispatch all files uploaded via uploadFiles action', () => {
    const dispatchMock = jest.fn();

    render(
      <UploadContainer
        state={{ files: new Map(), errors: new Map() }}
        dispatch={dispatchMock}
        openUpload
      />,
      {
        wrapper: ProviderWrapper,
      },
    );

    const uploadInput = screen.getByLabelText('Upload Books');

    fireEvent.change(uploadInput, {
      target: {
        files: [new File([''], 'test.pdf')],
        preventDefault: () => {},
        persist: () => {},
      },
    });

    return waitFor(() =>
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'FILES_UPLOAD',
        files: expect.arrayContaining([expect.any(File)]),
      }),
    );
  });
  // not quite sure how to test this one yet
  it.todo('will dispatch file on each progress event');

  it('will dispatch a file error on error', () => {
    const dispatchMock = jest.fn();

    render(
      <UploadContainer
        state={{ files: new Map(), errors: new Map() }}
        dispatch={dispatchMock}
        openUpload
      />,
      {
        wrapper: ProviderWrapper,
      },
    );

    const uploadInput = screen.getByLabelText('Upload Books');

    fireEvent.change(uploadInput, {
      target: {
        files: [new File([''], 'error.pdf')],
        preventDefault: () => {},
        persist: () => {},
      },
    });

    return waitFor(() =>
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'FILE_ERROR',
        path: 'error.pdf',
        error: expect.any(Error),
      }),
    );
  });
});
