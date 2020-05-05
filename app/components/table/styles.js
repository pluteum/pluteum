import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
`;

export const StyledHeaderRow = styled.tr`
  border-bottom: ${props => props.theme.colors.lightGrey} 2px solid;

  > th:first-child {
    padding-left: 16px;
  }

  > th:last-child {
    padding-left: 16px;
  }
`;

export const StyledHeaderCell = styled.th`
  font-family: ${props => props.theme.type.sans_serif};
  color: ${props => props.theme.colors.darkGrey};
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  padding: 8px 0;
`;

export const StyledRow = styled.tr`
  align-items: center;

  height: 56px;
  background: ${props => props.theme.colors.white};

  &:nth-of-type(2n) {
    background: ${props => props.theme.colors.lightBlue};
  }

  > td:first-child {
    padding-left: 16px;
  }

  > td:last-child {
    padding-left: 16px;
  }
`;
