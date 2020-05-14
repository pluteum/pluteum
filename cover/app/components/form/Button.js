/*
 * Button
 */

import styled from 'styled-components';

export default styled.button`
  background: ${props => props.theme.colors.primary};
  border-radius: 20px;
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.colors.white};
  text-align: center;
  -webkit-appearance: none;
  border: 0;
  padding: 10px 25px;
  cursor: pointer;
  outline: none;

  &:hover {
    background: ${props => props.theme.colors.primary__hover};
  }
`;
