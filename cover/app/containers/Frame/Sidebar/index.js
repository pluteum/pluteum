// Sidebar

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faListUl,
  faQuestionCircle,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/common/Logo/Logo';
import { Link } from 'react-router-dom';
import SidebarButton from './SidebarButton';

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

export default function Sidebar({ onOpenUpload }) {
  return (
    <Layout>
      <div className="top">
        <LogoLink to="/">
          <Logo icon />
        </LogoLink>
        <SidebarButton as="button" onClick={onOpenUpload}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </SidebarButton>
        <SidebarButton to="">
          <FontAwesomeIcon icon={faListUl} />
        </SidebarButton>
      </div>
      <div className="bottom">
        <SidebarButton to="/settings">
          <FontAwesomeIcon icon={faCogs} />
        </SidebarButton>
        <SidebarButton to="">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </SidebarButton>
      </div>
    </Layout>
  );
}

Sidebar.propTypes = {
  onOpenUpload: PropTypes.func,
};

Sidebar.defaultProps = {};
