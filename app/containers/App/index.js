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

import GlobalStyle from '../../global-styles';
import Header from '../../components/layout/header/Header';
import Breadcrumb from '../../components/layout/breadcrumbs/Breadcrumbs';
import BookIndex from '../BookIndex';

export default function App() {
  return (
    <div>
      <Header />
      <Breadcrumb />
      <Switch>
        <Route exact path="/" component={BookIndex} />
        <Route exact path="/index" component={BookIndex} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
