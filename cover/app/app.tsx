/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import {
  ApolloClient,
  ApolloLink,
  fromPromise,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from 'react-apollo';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import 'file-loader?name=.htaccess!./.htaccess';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/link-context';

import { customFetch } from 'utils/fetch';
import theme from './theme';
import { enableMapSet } from 'immer';

enableMapSet();

const MOUNT_NODE = document.getElementById('app');
const browserHistory = createBrowserHistory();
let jwt;

function redirectToLogin() {
  browserHistory.push('/login');
}

function tryRefreshToken() {
  return fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{refresh}' }),
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(json => {
        if (!json.data.refresh) {
          redirectToLogin();
          throw new Error(json.errors[0].message);
        }

        return json;
      });
    }

    redirectToLogin();
    throw new Error(response.statusText);
  });
}

// eslint-disable-next-line consistent-return
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    if (graphQLErrors.some(error => error.message === 'UNAUTHENTICATED')) {
      return fromPromise(tryRefreshToken()).flatMap(({ data }) => {
        const newToken = data.refresh;

        setToken(newToken);

        const operationHeaders = operation.getContext().headers;

        operation.setContext({
          headers: {
            ...operationHeaders,
            Authorization: `Bearer: ${newToken}`,
          },
        });

        return forward(operation);
      });
    }
  }
});

let darkMode = false;

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  darkMode = true;
}

function setToken(token) {
  jwt = token;
}

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: jwt ? `Bearer: ${jwt}` : '',
  },
}));

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    createUploadLink({
      fetch: customFetch,
    }),
  ]),
  cache: new InMemoryCache(),
});

const render = () => {
  ReactDOM.render(
    <Router history={browserHistory}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme(darkMode)}>
          <App setJWT={setToken} />
        </ThemeProvider>
      </ApolloProvider>
    </Router>,
    MOUNT_NODE,
  );
};

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
