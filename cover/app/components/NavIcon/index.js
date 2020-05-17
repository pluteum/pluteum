import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

const Component = styled(NavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  appearance: none;
  cursor: pointer;
  background: none;
  border: 0;

  width: 40px;
  height: 100%;

  margin: 0 8px;

  color: ${props => props.theme.colors.darkGrey};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &.active::after {
    content: '';
    width: 100%;
    height: 4px;
    background: ${props => props.theme.colors.primary};

    position: absolute;
    bottom: -10px;
    left: 0;
  }

  > svg {
    transition: transform 0.5s ease;
  }
`;

export default function NavIcon({ children, ...props }) {
  return (
    <Component activeClassName="active" {...props}>
      {children}
    </Component>
  );
}

NavIcon.propTypes = {
  children: PropTypes.node,
};
