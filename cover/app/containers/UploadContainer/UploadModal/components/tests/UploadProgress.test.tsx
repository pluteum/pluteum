import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import theme from 'theme';

import UploadProgress from '../UploadProgress';

const ProviderWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('<UploadProgress />', () => {
  const files = new Map([
    ['test.pdf', { path: 'test.pdf', progress: 0.5 }],
    ['test2.pdf', { path: 'test2.pdf', progress: 0.5 }],
  ]);

  const errors = new Map([['test2.pdf', new Error()]]);

  it('will display the number of files uploading, total progress and error count', () => {
    render(
      <UploadProgress files={files} errors={errors} totalProgress={0.5} />,
      {
        wrapper: ProviderWrapper,
      },
    );

    expect(screen.getByText('Uploading 2 files...')).toBeInTheDocument();
    expect(screen.getByText('50% complete')).toBeInTheDocument();
    expect(screen.getByText('1 error')).toBeInTheDocument();
  });

  it('will expand to show individual file uploads', () => {
    render(
      <UploadProgress
        files={files}
        errors={errors}
        totalProgress={0.5}
        expanded
      />,
      {
        wrapper: ProviderWrapper,
      },
    );

    expect(screen.getByText('Uploading test.pdf')).toBeInTheDocument();
    expect(screen.getByText('Uploading test2.pdf')).toBeInTheDocument();
  });
  it('will expand uploads with errors', () => {
    render(
      <UploadProgress files={files} errors={errors} totalProgress={0.5} />,
      {
        wrapper: ProviderWrapper,
      },
    );

    expect(
      screen.getByText('An error has occured while uploading test2.pdf'),
    ).toBeInTheDocument();
  });
  it('will call onMinimize when minimize button is pressed', () => {
    const onMinimizeMock = jest.fn();

    render(
      <UploadProgress
        files={files}
        errors={errors}
        totalProgress={0.5}
        onMinimize={onMinimizeMock}
      />,
      {
        wrapper: ProviderWrapper,
      },
    );

    const minimizeButton = screen.getByRole('button');

    fireEvent.click(minimizeButton);

    expect(onMinimizeMock).toHaveBeenCalled();
  });
});
