/**
 *
 * Setting
 *
 */
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBook, faCog } from '@fortawesome/free-solid-svg-icons';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LibraryManagement from 'containers/Settings/LibraryManagement';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import FileManagement from 'containers/Settings/FileManagement';
import Sidebar from '../../components/common/Sidebar';
import SidebarItem from '../../components/common/SidebarItem';

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
      <Sidebar title="Settings">
        <SidebarItem icon={faUser} link="/settings/profile" text="Profile" />
        <SidebarItem icon={faBook} link="/settings/library" text="Library" />
        <SidebarItem icon={faCog} link="/settings/files" text="Files" />
      </Sidebar>
      <Switch>
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
