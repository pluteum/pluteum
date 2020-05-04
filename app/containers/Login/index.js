import React from 'react';
import PropTypes from 'prop-types';

import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';
import TextInput from 'components/form/input/Text';
import Checkbox from 'components/form/input/Checkbox';
import Button from 'components/form/Button';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #f7f8fa;
`;

const Box = styled.div`
  max-width: 560px;
  padding: 70px 80px 50px;
  background: #ffffff;
  margin: 0 auto;
  position: relative;
  top: 50px;

  form {
    margin: 80px 0 50px;

    > h1,
    > div {
      margin: 25px 0;
    }
  }

  > p {
    margin-top: 70px;
    padding: 25px 0 0;
    font-family: ${props => props.theme.type.sans_serif};
    color: ${props => props.theme.colors.darkGrey};
    border-top: ${props => props.theme.colors.lightGrey} 1px solid;
    font-size: 12px;
  }

  .spinner {
    color: ${props => props.theme.colors.white};
    font-size: 16px;
    animation: ${spin} 2s linear infinite;
  }

  @media (max-width: 425px) {
    height: 100%;
    top: 0;
    padding: 40px;

    form {
      margin: 40px 0;
    }
  }
`;

const MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        firstName
        lastName
      }
    }
  }
`;

export default function Login({ setJWT, history }) {
  const [login, { loading }] = useMutation(MUTATION);

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { rememberme, ...input } = Object.fromEntries(formData.entries());

    login({ variables: { input } }).then(({ data: { login: { token } } }) => {
      setJWT(token);
      history.push('/');
    });
  }

  return (
    <Layout>
      <Box>
        <Logo />
        <form onSubmit={onSubmit}>
          <Typography type="SectionTitle">Sign In</Typography>
          <TextInput disabled={loading} name="email" label="Email Address" />
          <TextInput
            disabled={loading}
            name="password"
            label="Password"
            type="password"
          />
          <Checkbox disabled={loading} name="rememberme" label="Remember Me" />
          <Button>
            {loading ? (
              <FontAwesomeIcon className="spinner" icon={faSpinner} />
            ) : (
              'Login'
            )}
          </Button>
        </form>
        <p>Developed by George Sumpster / Designed by Johnny Lee</p>
      </Box>
    </Layout>
  );
}

Login.propTypes = {
  setJWT: PropTypes.func,
  history: PropTypes.object,
};
