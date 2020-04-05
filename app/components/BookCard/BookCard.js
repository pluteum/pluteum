/*
 * FeaturedBook
 */

import React from 'react';
import styled from 'styled-components';
import BookCover from '../common/BookCover';
import BookImage from '../../images/sample_book.png';
import Heading from '../common/Type/Heading';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-left: 40px;
  }
`;

const Author = styled.p`
  font-size: 15px;
  color: #555555;
`;

export default function BookCard() {
  return (
    <Wrapper>
      <BookCover src={BookImage} alt="Sample Book" />
      <Heading level={2}>Sample Book</Heading>
      <Author>Sample Book</Author>
    </Wrapper>
  );
}
