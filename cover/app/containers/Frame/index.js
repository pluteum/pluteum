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
import Breadcrumb from 'containers/Frame/Breadcrumb';
import UploadModal from 'containers/UploadModal';
import Settings from 'containers/Settings';

import ModalPortal from 'components/common/ModalPortal/ModalPortal';

const AppLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 425px) {
    flex-direction: row;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;

  > div:nth-of-type(2) {
    height: calc(100% - 39px);
  }
`;

export default function Frame() {
  const [openUpload, setUploadModal] = useState();

  return (
    <AppLayout>
      <Sidebar onOpenUpload={() => setUploadModal(true)} />
      <ContentContainer>
        <Breadcrumb />
        <Switch>
          <Route path="/settings" component={Settings} />
        </Switch>
      </ContentContainer>
      {openUpload && (
        <ModalPortal>
          <UploadModal onExit={() => setUploadModal(false)} />
        </ModalPortal>
      )}
    </AppLayout>
  );
}
