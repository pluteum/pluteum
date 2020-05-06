import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const StyledTag = styled.span`
  position: relative;
  display: inline-block;
  padding: 8px 16px;
  margin: 0 5px;
  ${props => props.hasDeleteIcon && 'padding-right: 38px;'}

  border-radius: 16px;

  font-size: 12px;
  color: ${props => props.theme.colors.darkGrey};
  background: ${props => props.theme.colors.notAsLightBlue};
`;

const StyledDeleteButton = styled.button`
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);

  height: 24px;
  width: 24px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  appearance: none;
  outline: none;
  cursor: pointer;
  border: 0;
  border-radius: 50%;
  background: #fff;
`;

export default function Tag({ children, onDelete }) {
  const deleteIcon = (
    <StyledDeleteButton onClick={onDelete}>
      <FontAwesomeIcon icon={faTimes} />
    </StyledDeleteButton>
  );

  return (
    <StyledTag hasDeleteIcon={!!onDelete}>
      {children}
      {onDelete && deleteIcon}
    </StyledTag>
  );
}

Tag.propTypes = {
  children: PropTypes.node,
  onDelete: PropTypes.func,
};
