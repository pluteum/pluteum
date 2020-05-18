import React from 'react';
import { render } from 'react-testing-library';

import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';
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
    const { getByLabelText } = render(<LoginUI errors={{}} loading />, {
      wrapper: ProviderWrapper,
    });

    expect(getByLabelText('Email Address').disabled).toBe(true);
    expect(getByLabelText('Password').disabled).toBe(true);
  });

  it('renders errors when they exist in the errors object', () => {
    const errors = {
      form: 'Form Error',
      email: 'Invalid Email',
      password: 'Invalid Password',
    };

    const { getByText } = render(<LoginUI errors={errors} loading={false} />, {
      wrapper: ProviderWrapper,
    });

    expect(getByText('Form Error')).toBeTruthy();
    expect(getByText('Invalid Email')).toBeTruthy();
    expect(getByText('Invalid Password')).toBeTruthy();
  });
});
