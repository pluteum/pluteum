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
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import GlobalStyle from '../../global-styles';
import Frame from '../Frame';
import Register from '../Register';

const AppLayout = styled.div`
  height: 100%;
`;

const query = gql`
  {
    me {
      firstName
      lastName
    }
  }
`;

export default function App() {
  const { data } = useQuery(query);

  console.log(data);

  return (
    <AppLayout>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/" component={Frame} />
        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </AppLayout>
  );
}
