/*
 * FeaturedBook
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BookCover from '../common/BookCover';
import BookImage from '../../images/sample_book.png';
import Typography from '../common/Type/Typography';

const Wrapper = styled.div`
  display: inline-flex;
  width: 180px;
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

export default function BookCard({ book }) {
  return (
    <Wrapper>
      <BookCover image={BookImage} title={book.title} />
      <Typography type="BookCardTitle">{book.title}</Typography>
      <Typography type="BookCardAuthor">{book.author}</Typography>
    </Wrapper>
  );
}

BookCard.propTypes = {
  book: PropTypes.object,
};
