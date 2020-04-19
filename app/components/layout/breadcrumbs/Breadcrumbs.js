/*
 *  Breadcrumb
 */

import React from 'react';
import styled from 'styled-components';

const BreadcrumbBar = styled.div`
  background: #f1f1f1;
  padding: 15px 25px;

  font-size: 15px;
  color: #555555;

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    font-family: 'Noto Sans', sans-serif;
    font-size: 12px;
    display: inline-block;
    margin: 0 10px;
    font-weight: lighter;
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
