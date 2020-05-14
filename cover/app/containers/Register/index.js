import React from 'react';

import styled from 'styled-components';

import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';

import TextInput from 'components/form/input/Text';
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
`;

const MUTATION = gql`
  mutation login($input: RegisterInput!) {
    register(input: $input) {
      firstName
      lastName
    }
  }
`;

export default function Register() {
  const [register] = useMutation(MUTATION);

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const input = Object.fromEntries(formData.entries());

    register({ variables: { input } }).then(result => console.log(result));
  }

  return (
    <Layout>
      <Box>
        <Logo />
        <Typography type="SectionTitle">Sign Up</Typography>
        <form onSubmit={onSubmit}>
          <TextInput name="firstName" label="First Name" />
          <TextInput name="lastName" label="Last Name" />
          <TextInput name="email" label="Email" />
          <TextInput name="password" label="Password" type="password" />
          <Button>Sign Up</Button>
        </form>
      </Box>
    </Layout>
  );
}
