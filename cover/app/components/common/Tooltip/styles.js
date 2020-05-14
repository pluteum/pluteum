import styled from 'styled-components';
export const TooltipButton = styled.span`
  display: inline-block;
  padding: 12px 16px;

  color: #555555;
  cursor: pointer;

  border: 1px solid #d8d8d8;
  border-radius: 4px;

  &:hover {
    background-color: #d8d8d82a;
  }

  > .icon {
    margin-right: 10px;
  }

  > span {
    font-size: 15px;
    font-weight: 100;
  }
`;

export const TooltipContent = styled.div`
  background-color: #353535;
  margin: 7px;
  padding: 10px;
  color: #fff;
  font-weight: 100;
  font-size: 14px;
`;

export const Arrow = styled.div`
  position: absolute;
  width: 1em;
  height: 1em;
  &[data-placement*='bottom'] {
    top: 0;
    left: 0;
    margin-top: -0.5em;
    width: 1em;
    height: 1em;
    &::before {
      border-width: 0 0.5em 0.5em 0.5em;
      border-color: transparent transparent #353535 transparent;
    }
  }
  &[data-placement*='top'] {
    bottom: 0;
    left: 0;
    margin-bottom: -0.5em;
    width: 1em;
    height: 1em;
    &::before {
      border-width: 0.5em 0.5em 0 0.5em;
      border-color: #353535 transparent transparent transparent;
    }
  }
  &[data-placement*='right'] {
    left: 0;
    margin-left: -0.5em;
    height: 1em;
    width: 1em;
    &::before {
      border-width: 0.5em 0.5em 0.5em 0;
      border-color: transparent #353535 transparent transparent;
    }
  }
  &[data-placement*='left'] {
    right: 0;
    margin-right: -0.5em;
    height: 1em;
    width: 1em;
    &::before {
      border-width: 0.5em 0 0.5em 0.5em;
      border-color: transparent transparent transparent #353535;
    }
  }
  &::before {
    content: '';
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
`;
