import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';
import TextInput from 'components/form/input/Text';
import Checkbox from 'components/form/input/Checkbox';
import Button from 'components/form/Button';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #f7f8fa;
`;

const Box = styled.div`
  max-width: 560px;
  padding: 70px 80px;
  background: #ffffff;
  margin: 0 auto;
  position: relative;
  top: 100px;

  form {
    margin: 50px 0;

    > * {
      margin: 25px 0;
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
  const [login] = useMutation(MUTATION);

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const input = Object.fromEntries(formData.entries());

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
          <TextInput name="email" label="Email" />
          <TextInput name="password" label="Password" type="password" />
          <Checkbox name="rememberme" label="Remember Me" />
          <Button>Login</Button>
        </form>
      </Box>
    </Layout>
  );
}

Login.propTypes = {
  setJWT: PropTypes.func,
  history: PropTypes.object,
};
