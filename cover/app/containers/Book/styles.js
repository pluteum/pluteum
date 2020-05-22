import styled from 'styled-components';

export const BookTitle = styled.h1`
  font-family: ${props => props.theme.type.display_serif};
  font-weight: normal;
  font-size: 72px;
  line-height: 80px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const Author = styled.p`
  font-family: ${props => props.theme.type.mono};
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const Description = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const MetaHeader = styled.h2`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const FieldHeader = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const FieldContent = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const Tag = styled.span`
  display: inline-block;
  margin: 0 4px;
  padding: 8px 16px;

  font-size: 14px;
  font-family: ${props => props.theme.type.serif_text};
  font-weight: 500;

  background: ${props => props.theme.colors.white};
  border: 1px solid #bdc0c4;
  border-radius: 4px;
  color: #65676c;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;
