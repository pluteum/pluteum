import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconButton = styled.button`
  height: 35px;
  width: 35px;
  border: 0;
  cursor: pointer;
  border-radius: 50%;
  appearance: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  background: 0;
  margin: 0 4px;

  &:hover {
    background: ${props => props.theme.colors.lightGrey};
  }
`;

export default IconButton;
