/**
 *
 * Sidebar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '../Type/Typography';

const Wrapper = styled.div`
  height: 100%;
  width: 260px;
  padding: 40px;

  border-right: #f2f2f2 2px solid;

  ul {
    margin: 25px 0;
    padding: 0;
  }
`;

function Sidebar({ title, children }) {
  return (
    <Wrapper>
      <Typography type="SidebarHeader">{title}</Typography>
      <ul>{children}</ul>
    </Wrapper>
  );
}

Sidebar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default memo(Sidebar);
