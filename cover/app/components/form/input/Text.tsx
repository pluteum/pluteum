/*
 * Text
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StyledLabel from '../Label';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
`;

const StyledInput: any = styled.input`
  font-family: ${props => props.theme.type.sans_serif};

  color: ${props => props.theme.colors.darkGrey};

  font-weight: 400;
  border: ${props => props.theme.colors.grey} 1px solid;
  border-radius: 4px;

  padding: 10px 13px;
  line-height: 22px;

  outline: none;

  &:disabled {
    background: ${props => props.theme.colors.lightBlue};
  }

  &:active,
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const StyledError = styled.p`
  margin: 5px 0 0;
  font-family: ${props => props.theme.type.sans_serif};
  color: ${props => props.theme.colors.red};
  font-size: 12px;
  line-height: 14px;
`;

export default function Text({ label, error, name, ...props }: any): any {
  if (label) {
    return (
      <InputGroup>
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
        <StyledInput id={name} name={name} {...props} />
        {error && <StyledError>{error}</StyledError>}
      </InputGroup>
    );
  }

  return <StyledInput name={name} {...props} />;
}

Text.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
