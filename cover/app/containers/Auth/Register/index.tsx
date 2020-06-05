import React from 'react';

import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';

import TextInput from 'components/form/input/Text';
import Button from 'components/form/Button';

import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import Layout from 'containers/Auth/components/Layout';

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
    // @ts-ignore
    const input = Object.fromEntries(formData.entries());

    register({ variables: { input } }).then(result => console.log(result));
  }

  return (
    <Layout>
      <Logo />
      <form onSubmit={onSubmit}>
        <Typography type="SectionTitle">Sign Up</Typography>
        <TextInput name="firstName" label="First Name" />
        <TextInput name="lastName" label="Last Name" />
        <TextInput name="email" label="Email" />
        <TextInput name="password" label="Password" type="password" />
        <Button primary>Sign Up</Button>
      </form>
    </Layout>
  );
}
