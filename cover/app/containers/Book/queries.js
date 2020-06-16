import gql from 'graphql-tag';

export const GET_BOOK = gql`
  query getBook($id: Int!) {
    getBook(id: $id) {
      id
      title
      author {
        id
        name
      }
    }
  }
`;
