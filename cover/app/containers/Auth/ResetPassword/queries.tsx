import gql from 'graphql-tag';

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($input: ResetInput!) {
    reset(input: $input) {
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
