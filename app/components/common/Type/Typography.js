/*
 * Typography
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BASE_STYLE = `
  margin: 0;
`;

const SectionTitle = styled.h1`
  font-family: PT Serif;
  font-weight: bold;
  font-size: 30px;
  color: #000000;
`;

const Paragraph = styled.p`
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: lighter;
  font-size: 20px;
  line-height: 30px;
  color: #555555;
`;

const BookCardTitle = styled.p`
  ${BASE_STYLE}
  font-family: PT Serif;
  font-weight: bold;
  font-size: 20px;
  color: #000000;
  letter-spacing: 0;
`;

const BookCardAuthor = styled.p`
  ${BASE_STYLE}
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 15px;
  color: #555555;
`;

const FeaturedBookTitle = styled(BookCardTitle)`
  font-size: 24px;
`;

const FeaturedBookAuthor = styled(BookCardAuthor)`
  font-size: 18px;
  color: #000000;
  font-weight: 500;
`;

const TextLink = styled(Link)`
  ${BASE_STYLE}
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000000;
  letter-spacing: 3px;
  text-decoration: none;
`;

const styles = {
  BookCardTitle,
  BookCardAuthor,
  FeaturedBookTitle,
  FeaturedBookAuthor,
  TextLink,
  SectionTitle,
  Paragraph,
};

export default function Typography({ type = 'Paragraph', children, ...props }) {
  return React.createElement(styles[type], props, ...children);
}

Typography.propTypes = {
  type: PropTypes.oneOf(Object.keys(styles)),
  children: PropTypes.node,
};
