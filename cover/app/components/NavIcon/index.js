import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

const Component = styled(NavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 100%;

  margin: 0 8px;

  color: ${props => props.theme.colors.darkGrey};

  &.active::after {
    content: '';
    width: 100%;
    height: 4px;
    background: ${props => props.theme.colors.primary};

    position: absolute;
    bottom: -10px;
    left: 0;
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
