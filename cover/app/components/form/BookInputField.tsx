import styled from 'styled-components';

export const TitleInput = styled.input`
  background: #dbdde2;
  font-size: inherit;
  border: 0;
  border-radius: 4px;
  font-family: ${props => props.theme.type.display_serif};
  font-weight: normal;
  line-height: auto;
  color: ${props => props.theme.colors.black};
  margin: 0;
  height: 100%;
  padding: 0 10px;
  width: auto;

  @media (min-width: 768px) {
    line-height: 80px;
    margin: 0;
  }
`;
