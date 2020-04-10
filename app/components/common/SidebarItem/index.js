/**
 *
 * SidebarItem
 *
 */

import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.li`
  position: relative;
  list-style: none;
  text-decoration: none;

  font-family: OpenSans-Light;
  font-size: 16px;
  color: #555555;
  font-weight: 100;

  margin: 0 0 20px;

  a {
    position: relative;
    text-decoration: none;
    color: inherit;
  }

  a.active {
    color: #485cc7;
    font-weight: 600;
    svg {
      color: #485cc7;
    }
  }

  a.active:after {
    content: '';
    width: calc(100% - 30px);
    bottom: -2px;
    left: 30px;
    height: 2px;
    position: absolute;
    background-color: #485cc7;
  }

  &:hover,
  &:hover svg {
    color: #485cc7;
  }

  svg {
    margin-right: 15px;
    color: #aaa;
  }
`;

function SidebarItem({ icon, text, link }) {
  return (
    <Wrapper>
      <NavLink to={link} activeClassName="active">
        <FontAwesomeIcon icon={icon} />
        {text}
      </NavLink>
    </Wrapper>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string,
  link: PropTypes.string,
};

export default memo(SidebarItem);
