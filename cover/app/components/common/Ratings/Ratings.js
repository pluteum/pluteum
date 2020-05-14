/*
 * Ratings
 */

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as RegularStar } from '@fortawesome/free-regular-svg-icons';

import PropTypes from 'prop-types';

export default function Ratings({ rating }) {
  return [0, 0, 0, 0, 0].map((_, i) =>
    i < rating ? (
      <FontAwesomeIcon key={i} icon={SolidStar} /> // eslint-disable-line
    ) : (
      <FontAwesomeIcon key={i} icon={RegularStar} /> // eslint-disable-line
    ),
  );
}

Ratings.propTypes = {
  rating: PropTypes.oneOf([1, 2, 3, 4, 5]),
};
