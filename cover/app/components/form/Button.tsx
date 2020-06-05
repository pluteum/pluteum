/*
 * Button
 */

import styled from 'styled-components';

const Button: any = styled.button`
  background: ${(props: any) =>
    props.primary ? props.theme.colors.primary : props.theme.colors.white};
  border-radius: 20px;
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 500;
  font-size: 16px;
  color: ${(props: any) =>
    props.primary
      ? props.theme.colors.alwaysWhite
      : props.theme.colors.darkGrey};
  text-align: center;
  -webkit-appearance: none;
  border: ${(props: any) =>
    props.primary ? '0' : `1px solid ${props.theme.colors.lightGrey}`};
  padding: 10px 23px;
  cursor: pointer;
  outline: none;

  &:hover {
    background: ${(props: any) =>
      props.primary
        ? props.theme.colors.primary__hover
        : props.theme.colors.notAsLightBlue};
  }
`;

export default Button;
