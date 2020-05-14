/**
 *
 * Setting
 *
 */
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LibraryManagement from 'containers/Settings/LibraryManagement';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import FileManagement from 'containers/Settings/FileManagement';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export function Settings() {
  return (
    <Layout>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Setting" />
      </Helmet>
      {/* <Sidebar title="Settings">
        <SidebarItem icon={faUser} link="/settings/profile" text="Profile" />
        <SidebarItem icon={faBook} link="/settings/library" text="Library" />
        <SidebarItem icon={faCog} link="/settings/files" text="Files" />
      </Sidebar> */}
      <Switch>
        <Redirect exact from="/settings" to="/settings/files" />
        <Route path="/settings/profile" component={NotFoundPage} />
        <Route path="/settings/library" component={LibraryManagement} />
        <Route path="/settings/files" component={FileManagement} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}

Settings.propTypes = {};

export default memo(Settings);
