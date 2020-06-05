import gql from 'graphql-tag';

export const GET_BOOKS = gql`
  {
    books {
      title
      author {
        name
      }
    }
  }
`;
