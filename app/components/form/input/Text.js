/*
 * Text
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StyledLabel from 'components/form/Label';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  font-family: ${props => props.theme.type.sans_serif}

  color: ${props => props.theme.colors.darkGrey};

  font-weight: 400;
  border: ${props => props.theme.colors.grey} 1px solid;
  border-radius: 4px;

  padding: 10px 13px;
  line-height: 22px;

  outline: none;

  &:active,
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export default function Text({ label, name, ...props }) {
  if (label) {
    return (
      <InputGroup>
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
        <StyledInput name={name} {...props} />
      </InputGroup>
    );
  }

  return <StyledInput name={name} {...props} />;
}

Text.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};
