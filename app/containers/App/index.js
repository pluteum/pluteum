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
import FeaturedBook from '../../components/FeaturedBook/FeaturedBook';
import BookCard from '../../components/BookCard/BookCard';
import Typography from '../../components/common/Type/Typography';

export default function App() {
  return (
    <div>
      <Header />
      <Breadcrumb />
      <Typography type="SectionTitle">Suggestions from Your Library</Typography>
      <FeaturedBook />
      <Typography type="SectionTitle">Your Library</Typography>
      <BookCard />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
