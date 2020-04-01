/*
 *  Breadcrumb
 */

import React from 'react';
import styled from 'styled-components';

const BreadcrumbBar = styled.div`
  background: #f1f1f1;
  padding: 20px 25px;

  font-size: 15px;
  color: #555555;

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    font-weight: lighter;
  }

  li:first-of-type {
    font-weight: bold;
    margin-left: 0;
  }
`;

export default function Breadcrumb() {
  return (
    <BreadcrumbBar>
      <ul>
        <li>George&apos;s Ebooks</li>
        <svg width="6" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 10.818L6 5.91 0 1"
            stroke="#AAA"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <li>All</li>
      </ul>
    </BreadcrumbBar>
  );
}
