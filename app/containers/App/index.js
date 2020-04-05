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

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import Header from '../../components/layout/header/Header';
import Breadcrumb from '../../components/layout/breadcrumbs/Breadcrumbs';
import Heading from '../../components/common/Type/Heading';
import FeaturedBook from '../../components/FeaturedBook/FeaturedBook';

export default function App() {
  return (
    <div>
      <Header />
      <Breadcrumb />
      {/* <Heading level={1}>Search &amp; Filters</Heading> */}
      <Heading level={1}>Suggestions from Your Library</Heading>
      <FeaturedBook />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
