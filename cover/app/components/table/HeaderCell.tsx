import React from 'react';
import PropTypes from 'prop-types';

import { StyledHeaderCell } from './styles';

export default function HeaderCell({ children, ...props }) {
  if (typeof children === 'string') {
    return <StyledHeaderCell {...props}>{children}</StyledHeaderCell>;
  }
  return <th {...props}>{children}</th>;
}

HeaderCell.propTypes = { children: PropTypes.node };
