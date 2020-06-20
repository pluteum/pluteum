import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import theme from 'theme';

import UploadInput from '../UploadInput';

const ProviderWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('<UploadInput />', () => {
  it('will call onUpload upon file input ', () => {
    const onUploadMock = jest.fn();

    render(<UploadInput onUpload={onUploadMock} />, {
      wrapper: ProviderWrapper,
    });

    const uploadInput = screen.getByLabelText('Upload Books');

    fireEvent.change(uploadInput, {
      target: {
        files: [new File([''], 'test.pdf', { type: 'application/pdf' })],
        preventDefault: () => {},
        persist: () => {},
      },
    });

    return waitFor(() =>
      expect(onUploadMock).toHaveBeenCalledWith([expect.any(File)]),
    );
  });
});
