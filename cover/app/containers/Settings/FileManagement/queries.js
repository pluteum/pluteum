import gql from 'graphql-tag';

export const GET_FILES = gql`
  {
    files {
      id
      name
      format
      url
      book {
        id
        title
      }
      scans {
        id
        queuedAt
        finishedAt
      }
      processed
    }
  }
`;

export const REPROCESS_FILE = gql`
  mutation reprocessFile($id: Int!) {
    reprocessFile(id: $id) {
      id
      file {
        id
      }
      uuid
      queuedAt
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($id: Int!) {
    deleteFile(id: $id)
  }
`;
