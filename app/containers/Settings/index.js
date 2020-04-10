/**
 *
 * Setting
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';

import LibraryManagement from 'containers/Settings/LibraryManagement/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Sidebar from '../../components/common/Sidebar';
import SidebarItem from '../../components/common/SidebarItem';

const Layout = styled.div`
  display: flex;
  height: calc(100% - 137px);
`;

export function Settings() {
  return (
    <Layout>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Setting" />
      </Helmet>
      <Sidebar title="Settings">
        <SidebarItem icon={faUser} link="/settings/profile" text="Profile" />
        <SidebarItem icon={faBook} link="/settings/library" text="Library" />
      </Sidebar>
      <Switch>
        <Route path="/settings/profile" component={NotFoundPage} />
        <Route path="/settings/library" component={LibraryManagement} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
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
