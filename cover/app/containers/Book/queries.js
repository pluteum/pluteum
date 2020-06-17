import gql from 'graphql-tag';

export const GET_BOOK = gql`
  query getBook($id: Int!) {
    getBook(id: $id) {
      id
      title
      description
      author {
        id
        name
      }
    }
  }
`;
