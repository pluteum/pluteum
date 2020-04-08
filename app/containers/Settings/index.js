/**
 *
 * Setting
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export function Settings() {
  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Setting" />
      </Helmet>
      <div>
        <h1>Test</h1>
      </div>
      <Switch>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Settings);
