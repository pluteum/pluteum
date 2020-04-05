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
  flex-direction: column;

  > div {
    margin-left: 40px;
  }
`;

export default function BookCard() {
  return (
    <Wrapper>
      <BookCover src={BookImage} alt="Sample Book" />
      <Typography type="BookCardTitle">Sample Book</Typography>
      <Typography type="BookCardAuthor">Sample Author</Typography>
    </Wrapper>
  );
}
