/*
 * FeaturedBook
 */

import React from 'react';
import styled from 'styled-components';
import BookCover from '../common/BookCover';
import BookImage from '../../images/sample_book.png';
import Typography from '../common/Type/Typography';

const Wrapper = styled.div`
  display: flex;
  margin: 0 20px;
  flex-direction: column;

  &:first-child {
    margin-left: 0;
  }

  &::last-child {
    margin-right: 0;
  }

  > img {
    margin-bottom: 15px;
  }
`;

export default function BookCard() {
  return (
    <Wrapper>
      <BookCover image={BookImage} title="Sample Book" />
      <Typography type="BookCardTitle">1Q84</Typography>
      <Typography type="BookCardAuthor">Haruki Murakami</Typography>
    </Wrapper>
  );
}
