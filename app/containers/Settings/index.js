/**
 *
 * Setting
 *
 */
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LibraryManagement from 'containers/Settings/LibraryManagement/Loadable';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

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

Settings.propTypes = {};

export default memo(Settings);
