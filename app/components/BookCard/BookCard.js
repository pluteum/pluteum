/*
 * FeaturedBook
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BookThumbnail from '../common/BookThumbnail';
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

  > div:first-child {
    margin-bottom: 15px;
  }
`;

export default function BookCard({ book }) {
  return (
    <Wrapper>
      <BookThumbnail image={BookImage} title={book.title} formats={['pdf']} />
      <Typography type="BookCardTitle">{book.title}</Typography>
      <Typography type="BookCardAuthor">{book.author}</Typography>
    </Wrapper>
  );
}

BookCard.propTypes = {
  book: PropTypes.object,
};
