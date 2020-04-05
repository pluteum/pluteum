/*
 * FeaturedBook
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookCover from './BookCover';
import BookImage from '../../images/sample_book.png';
import Heading from '../common/Type/Heading';
import Paragraph from '../common/Type/Paragraph';

const Wrapper = styled.div`
  display: flex;

  > div {
    margin-left: 40px;
  }
`;

export default function FeaturedBook() {
  return (
    <Wrapper>
      <BookCover src={BookImage} alt="Sample Book" />
      <div>
        <Heading level={2}>The Great Gatsby</Heading>
        <Heading level={3}>F. Scott Fitzgerald</Heading>
        <div>
          <Paragraph>
            In planning his novel, F. Scott Fitzgerald wrote, &quot;I want to
            write something new &ndash; something extraordinary and beautiful
            and simple and intricately patterned.&quot; Working with anxiety and
            saw he feeling that it
          </Paragraph>
          <Link to="/book/112">See More Details</Link>
        </div>
        <div>Your Rating Amazon Rating</div>
      </div>
    </Wrapper>
  );
}
