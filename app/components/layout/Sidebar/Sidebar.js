// Sidebar

import React from 'react';
import styled from 'styled-components';
import SidebarButton from 'components/layout/Sidebar/SidebarButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faListUl,
  faInfoCircle,
  faQuestionCircle,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/common/Logo/Logo';
import { Link } from 'react-router-dom';

const Layout = styled.div`
  background: #ffffff;
  width: 100%;
  padding: 18px;
  flex-shrink: 0;
  flex-basis: 50px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

  @media (min-width: 425px) {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 64px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  }
`;

const LogoLink = styled(Link)`
  display: block;
  width: 24px;

  @media (min-width: 425px) {
    margin: 18px auto 25px;
  }
`;

export default function Sidebar() {
  return (
    <Layout>
      <div className="top">
        <LogoLink to="/">
          <Logo icon />
        </LogoLink>
        <SidebarButton to="">
          <FontAwesomeIcon icon={faPlusCircle} />
        </SidebarButton>
        <SidebarButton to="">
          <FontAwesomeIcon icon={faListUl} />
        </SidebarButton>
      </div>
      <div className="bottom">
        <SidebarButton to="">
          <FontAwesomeIcon icon={faInfoCircle} />
        </SidebarButton>
        <SidebarButton to="">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </SidebarButton>
        <SidebarButton to="/settings">
          <FontAwesomeIcon icon={faCogs} />
        </SidebarButton>
      </div>
    </Layout>
  );
}

Sidebar.propTypes = {};

Sidebar.defaultProps = {};
