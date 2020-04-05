/*
 * Heading
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderOne = styled.h1`
  font-family: PT Serif;
  font-weight: bold;
  font-size: 30px;
  color: #000000;
`;

const HeaderTwo = styled.h2`
  font-family: PT Serif;
  font-size: 24px;
  color: #000000;
`;

const HeaderThree = styled.h3``;

export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <HeaderOne>{children}</HeaderOne>;
    case 2:
      return <HeaderTwo>{children}</HeaderTwo>;
    case 3:
      return <HeaderThree>{children}</HeaderThree>;
    default:
      return <HeaderOne>{children}</HeaderOne>;
  }
}

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3]),
  children: PropTypes.node,
};
