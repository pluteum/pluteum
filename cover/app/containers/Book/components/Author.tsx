import React from 'react';
import styled from 'styled-components';
import BookAuthorInput from 'components/form/BookAuthorInput';

const InputLayout = styled.div`
  display: flex;
  align-items: flex-start;

  > span {
    margin-right: 10px;
  }
`;

export const AuthorText = styled.p`
  font-family: ${props => props.theme.type.mono};
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
  margin: 0;
  margin-bottom: 0 0 15px;

  -webkit-font-smoothing: antialiased;

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 22px;
    margin: 15px 0 25px;
  }
`;

export default function Author({
  authors,
  editing,
  onLoadAuthors,
  createAuthor,
}: any) {
  if (editing) {
    return (
      <InputLayout>
        <AuthorText as="span">By</AuthorText>
        <BookAuthorInput
          name="author"
          onLoadAuthors={onLoadAuthors}
          createAuthor={createAuthor}
        />
      </InputLayout>
    );
  }

  return <AuthorText>By {authors.map(a => a.name).join(', ')}</AuthorText>;
}
