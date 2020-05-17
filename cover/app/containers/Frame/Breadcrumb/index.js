/*
 *  Breadcrumb
 */

import React from 'react';
import styled from 'styled-components';

const BreadcrumbBar = styled.div`
  position: relative;

  width: 100%;
  background: ${props => props.theme.colors.offWhite};
  padding: 8px 25px;
  line-height: 22px;

  font-size: 15px;
  color: ${props => props.theme.colors.darkGrey};

  z-index: 10;

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    font-family: ${props => props.theme.type.sans_serif};
    font-size: 12px;
    display: inline-block;
    margin: 0 10px;
  }
`;

export default function Breadcrumb() {
  return (
    <BreadcrumbBar>
      <ul>
        <li>George&apos;s Ebooks</li>
        <span className="seperator">/</span>
        <li>All</li>
      </ul>
    </BreadcrumbBar>
  );
}
