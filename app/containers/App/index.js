/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Settings from 'containers/Settings/Loadable';
import Sidebar from 'components/layout/Sidebar/Sidebar';

import GlobalStyle from '../../global-styles';

const AppLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 425px) {
    flex-direction: row;
  }
`;

export default function App() {
  return (
    <AppLayout>
      <Sidebar />
      <Switch>
        <Route path="/settings" component={Settings} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppLayout>
  );
}
