/*
 * Checkbox
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import checkmark from '../../../images/icons/checkmark.svg';

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 4px;

  &:checked {
    background: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CheckboxLabel = styled.label`
  font-family: ${props => props.theme.type.sans_serif};
  color: ${props => props.theme.colors.darkGrey};
  margin-left: 10px;

  input[type="checkbox"]:checked ~ &:before {
    content: '';
    background: url("${checkmark}") no-repeat center;

    width: 18px;
    height: 18px;

    position: absolute;
    left: 0;
    top: 3px;

    pointer-events: none;
  }
`;

export default function Checkbox({ label, name, ...props }) {
  if (label) {
    return (
      <InputGroup>
        <StyledCheckbox id={name} type="checkbox" name={name} {...props} />
        <CheckboxLabel for={name}>{label}</CheckboxLabel>
      </InputGroup>
    );
  }

  return <StyledCheckbox type="checkbox" name={name} {...props} />;
}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};
