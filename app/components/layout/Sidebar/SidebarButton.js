// SidebarButton

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonLink = styled(Link)`
  display: inline-flex;
  width: 100%;
  margin: 6px auto;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #494b4f;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;

  &:hover {
    color: #0a4fcd;
    border-right-color: #0a4fcd;
  }
`;

export default function SidebarButton({ to, children }) {
  return <ButtonLink to={to}>{children}</ButtonLink>;
}

SidebarButton.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

SidebarButton.defaultProps = {};
