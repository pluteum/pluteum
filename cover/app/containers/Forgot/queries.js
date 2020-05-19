import gql from 'graphql-tag';

export const FORGOT_MUTATION = gql`
  mutation Forgot($email: String!) {
    forgot(email: $email)
  }
`;
