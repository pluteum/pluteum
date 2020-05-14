// SidebarButton

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonLink = styled(Link)`
  display: flex;
  margin: 6px auto;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #494b4f;
  outline: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;

  transition: color 0.25s ease, background 0.25s ease;

  &:hover {
    color: #0a4fcd;
    background: #eff1f7;
  }
`;

export default function SidebarButton({ children, ...props }) {
  return <ButtonLink {...props}>{children}</ButtonLink>;
}

SidebarButton.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

SidebarButton.defaultProps = {};
