/*
 * Typography
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from './Paragraph';

const BookCardTitle = (tag = 'p') => styled[tag]`
  font-family: PT Serif;
  font-size: 20px;
  color: #000000;
  letter-spacing: 0;
`;

const BookCardAuthor = (tag = 'p') => styled[tag]`
  font-size: 15px;
  color: #555555;
`;

const TextLink = (tag = 'a') => styled[tag]`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #000000;
  letter-spacing: 3px;
`;

export default function Typography({ tag, type, children }) {
  switch (type) {
    case 'TextLink':
      return <TextLink tag={tag}>{children}</TextLink>;
    case 'BookCardTitle':
      return <BookCardTitle tag={tag}>{children}</BookCardTitle>;
    case 'BookCardAuthor':
      return <BookCardAuthor tag={tag}>{children}</BookCardAuthor>;
    default:
      return <Paragraph>{children}</Paragraph>;
  }
}

Typography.propTypes = {
  tag: PropTypes.string,
  type: PropTypes.oneOf([1, 2, 3]),
  children: PropTypes.node,
};
