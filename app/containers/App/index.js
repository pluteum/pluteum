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

import GlobalStyle from '../../global-styles';
import Frame from '../Frame';

const AppLayout = styled.div`
  height: 100%;
`;

export default function App() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Frame} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppLayout>
  );
}
