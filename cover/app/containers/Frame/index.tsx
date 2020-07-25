//
// Frame
// =========
// Frame Component is intended to be a general wrapper for all Pluteum
// screens with the main sidebar and breadcrumb navigation components
//
//

import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import ActionBar from 'containers/Frame/ActionBar';
import Breadcrumb from 'containers/Frame/Breadcrumb';
import UploadContainer from 'containers/UploadContainer';
import Settings from 'containers/Settings';
import Index from '../Index';
import Book from '../Book';
import {
  reducer as UploadReducer,
  initialState as UploadInitialState,
} from 'reducers/Upload';

const AppLayout = styled.div`
  height: 100%;
`;

const ContentLayout = styled.div`
  background: #f7f8fa;

  height: calc(100% - 103px);
  overflow-y: scroll;
`;

export default function Frame() {
  const [openUpload, setUploadModal] = useState(false);
  const [state, dispatch] = useReducer(UploadReducer, UploadInitialState);

  return (
    <AppLayout>
      <Breadcrumb />
      <ActionBar
        uploadError={state.errors.size > 0}
        uploadProgress={state.total}
        setUploadModal={setUploadModal}
      />
      <ContentLayout>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/book/:id" component={Book} exact />
          <Route path="/settings" component={Settings} />
        </Switch>
      </ContentLayout>
      <UploadContainer
        openUpload={openUpload}
        state={state}
        dispatch={dispatch}
        onExit={() => setUploadModal(false)}
      />
    </AppLayout>
  );
}
