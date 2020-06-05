import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../../theme';
import LoginUI from '../ui';

// eslint-disable-next-line react/prop-types
const ProviderWrapper = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

describe('<LoginUI />', () => {
  it('renders and matches the snapshot', () => {
    const { container } = render(<LoginUI errors={{}} loading={false} />, {
      wrapper: ProviderWrapper,
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('disables inputs whilst loading', () => {
    render(<LoginUI errors={{}} loading />, {
      wrapper: ProviderWrapper,
    });

    expect(screen.getByLabelText('Email Address')).toBeDisabled();
    expect(screen.getByLabelText('Password')).toBeDisabled();
  });

  it('renders errors when they exist in the errors object', () => {
    const errors = {
      form: 'Form Error',
      email: 'Invalid Email',
      password: 'Invalid Password',
    };

    render(<LoginUI errors={errors} loading={false} />, {
      wrapper: ProviderWrapper,
    });

    expect(screen.getByText('Form Error')).toBeTruthy();
    expect(screen.getByText('Invalid Email')).toBeTruthy();
    expect(screen.getByText('Invalid Password')).toBeTruthy();
  });
});
