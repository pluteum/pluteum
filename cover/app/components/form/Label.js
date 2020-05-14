import styled from 'styled-components';

export default styled.label`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.colors.darkGrey};
  line-height: 22px;
  margin-bottom: 6px;
`;
