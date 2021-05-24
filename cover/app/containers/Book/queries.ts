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
      tags {
        name
      }
      files {
        md5
        uuid
        name
        format
        size
        filePath
        url
        image
        processed
        scans {
          id
          uuid
          source
          payload
          error
          seen
          queuedAt
          finishedAt
        }
      }
    }
  }
`;
