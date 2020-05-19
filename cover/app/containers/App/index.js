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
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import Frame from '../Frame';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Reset from '../Auth/ResetPassword';
import Forgot from '../Auth/Forgot';

const AppLayout = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.white};
`;

export default function App({ setJWT }) {
  return (
    <AppLayout>
      <Switch>
        <Route
          path="/login"
          render={props => <Login {...props} setJWT={setJWT} />}
        />
        <Route path="/forgot" component={Forgot} />
        <Route
          path="/reset-password"
          render={props => <Reset {...props} setJWT={setJWT} />}
        />
        <Route path="/register" component={Register} />
        <Route path="/" component={Frame} />
        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </AppLayout>
  );
}

App.propTypes = {
  setJWT: PropTypes.func,
};
