import gql from 'graphql-tag';

export const loginMutation = gql`
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
