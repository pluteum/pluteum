/*
 * FeaturedBook
 */

import React from 'react';
import styled from 'styled-components';
import BookThumbnail from '../common/BookThumbnail';
import BookImage from '../../images/sample_book.png';
import Typography from '../common/Type/Typography';

const Wrapper = styled.div`
  display: flex;

  .book-details {
    margin-left: 40px;
  }
`;

export default function FeaturedBook() {
  return (
    <Wrapper>
      <BookThumbnail
        title="The Great Gatsby"
        image={BookImage}
        formats={['pdf', 'mobi']}
      />
      <div className="book-details">
        <Typography type="FeaturedBookTitle">The Great Gatsby</Typography>
        <Typography type="FeaturedBookAuthor">F. Scott Fitzgerald</Typography>
        <div>
          <Typography type="Paragraph">
            In planning his novel, F. Scott Fitzgerald wrote, &quot;I want to
            write something new &ndash; something extraordinary and beautiful
            and simple and intricately patterned.&quot; Working with anxiety and
            saw he feeling that it
          </Typography>
          <Typography type="TextLink" to="/book/112">
            See More Details
          </Typography>
        </div>
      </div>
    </Wrapper>
  );
}
