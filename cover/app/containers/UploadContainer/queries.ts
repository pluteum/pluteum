import gql from 'graphql-tag';

export const MUTATION = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      id
      image
      name
      url
      book {
        id
        title
      }
      processed
    }
  }
`;

export const GET_FILES = gql`
  {
    files {
      id
      image
      name
      url
      processed
    }
  }
`;
