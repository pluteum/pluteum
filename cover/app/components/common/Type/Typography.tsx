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
  ${BASE_STYLE}
  font-family: 'DM Serif Display', serif;
  font-weight: normal;
  font-size: 32px;
  color: ${props => props.theme.colors.black};
`;

const SettingsHeader = styled.h2`
  font-family: 'DM Serif Display', serif;
  font-size: 22px;
  color: #000000;
  font-weight: normal;
`;

const Author = styled.p`
  ${BASE_STYLE}
  font-family: ${props => props.theme.type.mono}
  font-weight: 300;
  font-size: 18px;
  color: ${props => props.theme.colors.darkGrey};
`;

const Paragraph = styled.p`
  font-family: 'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-weight: lighter;
  font-size: 20px;
  line-height: 30px;
  color: ${props => props.theme.colors.darkGrey};
`;

const FormError = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  color: ${props => props.theme.colors.red};
  font-size: 12px;
  line-height: 14px;
`;

const BookCardTitle = styled.p`
  ${BASE_STYLE}
  font-family: 'DM Serif Text', serif;
  font-weight: bold;
  font-size: 20px;
  color: #000000;
  letter-spacing: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookCardAuthor = styled.p`
  ${BASE_STYLE}
  font-family: 'IBM Plex Mono', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 15px;
  color: #555555;
`;

const TextLink = styled(Link)`
  ${BASE_STYLE}
  font-size: 16px;
  color: ${props => props.theme.colors.primary};
`;

const SidebarHeader = styled.h1`
  ${BASE_STYLE}
  font-family: 'IBM Plex Sans', 'Open Sans', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  color: #000000;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const styles = {
  Author,
  BookCardTitle,
  BookCardAuthor,
  TextLink,
  SectionTitle,
  Paragraph,
  SidebarHeader,
  SettingsHeader,
  FormError,
};

export default function Typography({ type = 'Paragraph', children, ...props }) {
  return React.createElement(styles[type], props, ...children);
}

Typography.propTypes = {
  type: PropTypes.oneOf(Object.keys(styles)),
  children: PropTypes.node,
};
