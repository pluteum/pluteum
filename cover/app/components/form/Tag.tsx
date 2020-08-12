import React from 'react';
import styled from 'styled-components';
import { X } from 'react-feather';

const StyledLi: any = styled.li`
  position: relative;
  list-style: none;

  display: inline-flex;
  align-items: center;

  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  color: ${props => props.theme.colors.darkGrey};

  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 500;
  font-size: 14px;

  padding: 8px ${(props: any) => (props.editing ? '28px' : '16px')} 8px 16px;
  margin: 8px 4px 0 0;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  > button {
    position: absolute;
    right: 8px;
    top: 52%;

    width: 14px;
    height: 14px;

    padding: 0;

    transform: translateY(-50%);

    border: 0;
    background: none;

    outline: none;

    cursor: pointer;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.primary};
    }
`;

interface Props {
  text: string;
  editable?: boolean;
  onRemove?: (e: any) => void;
}

export default function Tag({ text, editable, onRemove, ...props }: Props) {
  return (
    <StyledLi editing={editable} {...props}>
      {text}
      {editable && (
        <button type="button" onClick={onRemove}>
          <X size={14} />
        </button>
      )}
    </StyledLi>
  );
}
