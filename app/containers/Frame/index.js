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

import Settings from 'containers/Settings';

import ModalPortal from 'components/common/ModalPortal/ModalPortal';
import UploadModal from 'containers/UploadModal';

const AppLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 425px) {
    flex-direction: row;
  }
`;

export default function Frame() {
  const [openUpload, setUploadModal] = useState();

  return (
    <AppLayout>
      <Sidebar onOpenUpload={() => setUploadModal(true)} />
      <Switch>
        <Route path="/settings" component={Settings} />
      </Switch>
      {openUpload && (
        <ModalPortal>
          <UploadModal onExit={() => setUploadModal(false)} />
        </ModalPortal>
      )}
    </AppLayout>
  );
}
