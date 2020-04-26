//
// Frame
// =========
// Frame Component is intended to be a general wrapper for all Pluteum
// screens with the main sidebar and breadcrumb navigation components
//
//

import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Sidebar from 'containers/Frame/Sidebar';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Settings from 'containers/Settings';

import ModalPortal from 'components/common/ModalPortal/ModalPortal';
import Modal from 'components/common/Modal/Modal';

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
      md5
      name
    }
  }
`;

export default function Frame() {
  const [upload, { loading: mutationLoading }] = useMutation(MUTATION);

  function onUpload({
    target: {
      files: [file],
    },
  }) {
    upload({ variables: { file } });
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
            <h1>loading</h1>
          </Modal>
        </ModalPortal>
      )}
    </AppLayout>
  );
}
