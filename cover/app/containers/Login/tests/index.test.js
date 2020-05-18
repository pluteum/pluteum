import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';

import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';

import Login from '../index';
import { LOGIN_MUTATION } from '../queries';
import { GraphQLError } from 'graphql';

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        input: {
          email: 'test@email.com',
          password: 'password',
        },
      },
    },
    result: {
      data: {
        login: {
          token: '12345',
          user: {
            id: '1',
            firstName: 'Jane',
            lastName: 'Smith',
          },
        },
      },
    },
  },
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        input: {
          email: 'test@email.com',
          password: 'wrong_password',
        },
      },
    },
    error: new Error('Unknown username or password'),
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

describe('<Login />', () => {
  afterEach(cleanup);

  it("will validate the form's email and password ", () => {
    render(<Login />, {
      wrapper: ProviderWrapper,
    });

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'invalid email address.com' }, // invalid
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'aa' }, // too short
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.queryByText('Please enter a valid email')).toBeTruthy();
    expect(
      screen.queryByText('password must have a minimum length of 4.'),
    ).toBeTruthy();
  });

  it('will handle unexpected form errors', async () => {
    render(<Login />, {
      wrapper: ProviderWrapper,
    });

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@email.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrong_password' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText('Unexpected Error')).toBeInTheDocument();
    });
  });

  it('will set a jwt token with a valid form', async () => {
    const setJWT = jest.fn();
    const history = { push: jest.fn() };
    render(<Login setJWT={setJWT} history={history} />, {
      wrapper: ProviderWrapper,
    });

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@email.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(setJWT).toHaveBeenCalledWith('12345');
      expect(history.push).toHaveBeenCalledWith('/');
    });
  });
});
