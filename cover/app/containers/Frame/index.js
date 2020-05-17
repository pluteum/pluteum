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

import ActionBar from 'containers/Frame/ActionBar';
import Breadcrumb from 'containers/Frame/Breadcrumb';
import UploadModal from 'containers/UploadModal';
import Settings from 'containers/Settings';

import ModalPortal from 'components/common/ModalPortal/ModalPortal';

const AppLayout = styled.div`
  height: 100%;
`;

export default function Frame() {
  const [openUpload, setUploadModal] = useState();

  return (
    <AppLayout>
      <Breadcrumb />
      <ActionBar />

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
