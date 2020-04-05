/*
 * Ratings
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Ratings({ level, children }) {}

Heading.propTypes = {
  rating: PropTypes.oneOf([1, 2, 3]),
  children: PropTypes.node,
};
