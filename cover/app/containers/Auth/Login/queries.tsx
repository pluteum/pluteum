import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
