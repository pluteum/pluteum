import gql from 'graphql-tag';

export const GET_BOOKS = gql`
  {
    books {
      id
      title
      author {
        id
        name
      }
    }
  }
`;
