// Sidebar

import React from 'react';
import styled from 'styled-components';

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
    flex-basis: 64px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  }
`;

const LogoLink = styled(Link)`
  display: block;
  width: 24px;

  @media (min-width: 425px) {
    margin: 18px auto;
  }
`;

export default function Sidebar() {
  return (
    <Layout>
      <LogoLink to="/">
        <Logo icon />
      </LogoLink>
    </Layout>
  );
}

Sidebar.propTypes = {};

Sidebar.defaultProps = {};
