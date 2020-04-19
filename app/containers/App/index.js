/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Settings from 'containers/Settings/Loadable';

import GlobalStyle from '../../global-styles';
import Breadcrumb from '../../components/layout/breadcrumbs/Breadcrumbs';
import Homepage from '../HomePage';

export default function App() {
  return (
    <React.Fragment>
      <Breadcrumb />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
