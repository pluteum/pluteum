import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
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

  &:hover {
    background: ${props => props.theme.colors.lightGrey};
  }
`;

export default function IconButton({ onClick, icon, ...props }) {
  return (
    <StyledButton onClick={onClick}>
      <FontAwesomeIcon icon={icon} {...props} />
    </StyledButton>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.object,
};
