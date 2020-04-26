//
// Frame
// =========
// Frame Component is intended to be a general wrapper for all Pluteum
// screens with the main sidebar and breadcrumb navigation components
//
//

import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Sidebar from 'containers/Frame/Sidebar';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Settings from 'containers/Settings';

import ModalPortal from 'components/common/ModalPortal/ModalPortal';
import Modal from 'components/common/Modal/Modal';
import Typography from 'components/common/Type/Typography';
import ProgressBar from 'components/common/ProgressBar';

const AppLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 425px) {
    flex-direction: row;
  }
`;

const MUTATION = gql`
  mutation($file: FileUpload!) {
    uploadFile(file: $file) {
      id
      uuid
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

const GET_FILES = gql`
  {
    files {
      id
      uuid
      image
      name
      url
      processed
    }
  }
`;

export default function Frame() {
  const [uploadProgress, setProgress] = useState(0);

  const [upload, { loading: mutationLoading }] = useMutation(MUTATION, {
    update(cache, { data }) {
      const { files } = cache.readQuery({ query: GET_FILES });
      cache.writeQuery({
        query: GET_FILES,
        data: { files: files.concat([data.uploadFile]) },
      });
    },
  });

  function onUpload({
    target: {
      files: [file],
    },
  }) {
    upload({
      variables: {
        file,
      },
      context: {
        fetchOptions: {
          useUpload: true,
          onProgress: ev => {
            setProgress(ev.loaded / ev.total);
          },
          onAbortPossible: () => undefined,
        },
      },
    });
  }

  return (
    <AppLayout>
      <Sidebar onUpload={onUpload} />
      <Switch>
        <Route path="/settings" component={Settings} />
      </Switch>
      {mutationLoading && (
        <ModalPortal>
          <Modal>
            <Typography type="SectionTitle">Uploading</Typography>
            <ProgressBar percent={uploadProgress} />
          </Modal>
        </ModalPortal>
      )}
    </AppLayout>
  );
}
