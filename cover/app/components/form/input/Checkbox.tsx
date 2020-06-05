/*
 * Checkbox
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const checkmark = require('../../../images/icons/checkmark.svg');

const InputGroup: any = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  ${(props: any) => props.hasText && 'margin-bottom: 10px;'}
`;

const StyledCheckbox: any = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid ${(props: any) => props.theme.colors.grey};
  border-radius: 4px;
  cursor: pointer;

  outline: none;

  &:disabled {
    background: ${(props: any) => props.theme.colors.lightBlue};
  }

  &:checked {
    background: ${(props: any) => props.theme.colors.primary};
    border-color: ${(props: any) => props.theme.colors.primary};
  }
`;

const CheckboxLabel: any = styled.label`
  font-family: ${props => props.theme.type.sans_serif};
  color: ${props => props.theme.colors.darkGrey};
  margin-left: 10px;
  cursor: pointer;

  input[type="checkbox"]:checked ~ &:before {
    content: '';
    background: url("${checkmark}") no-repeat center;

    width: 18px;
    height: 18px;

    position: absolute;
    left: 0;
    top: ${(props: any) => (props.hasText ? '3px' : '0')};

    pointer-events: none;
  }
`;

export default function Checkbox({ label, name = label, ...props }) {
  return (
    <InputGroup hasText={label.length > 0}>
      <StyledCheckbox id={name} type="checkbox" name={name} {...props} />
      <CheckboxLabel hasText={label.length > 0} htmlFor={name}>
        {label}
      </CheckboxLabel>
    </InputGroup>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

Checkbox.defaultProps = {
  label: '',
};
