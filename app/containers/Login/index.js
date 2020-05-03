import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
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
        <Typography type="SectionTitle">Sign In</Typography>
        <form onSubmit={onSubmit}>
          <Input name="email" label="Email" />
          <Input name="password" label="Password" type="password" />
          <Button>Sign In</Button>
        </form>
      </Box>
    </Layout>
  );
}

Login.propTypes = {
  setJWT: PropTypes.func,
  history: PropTypes.object,
};
