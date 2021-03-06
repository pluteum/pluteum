import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/form/Button';
import BookCover from 'components/BookCover';
import PageHeader from 'components/common/PageHeader';
// import ReactFitText from 'react-fittext';
// import { Star } from 'react-feather';

import {
  BookTitle,
  Author,
  Description,
  // MetaHeader,
  // FieldHeader,
  // FieldContent,
  // Tag,
} from './styles';

const BookLayout = styled.div`
  display: grid;
  max-width: 1040px;
  margin: 40px auto;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 64px;
`;

const BookDetails = styled.div`
  overflow-y: scroll;
`;

const StyledRating = styled.div`
  margin: 0 0 19px;

  svg {
    margin-right: 1px;
  }
`;

// const rating = (
//   <StyledRating>
//     <Star size={16} stroke="transparent" fill="#E54B4B" />
//     <Star size={16} stroke="transparent" fill="#E54B4B" />
//     <Star size={16} stroke="transparent" fill="#E54B4B" />
//     <Star size={16} stroke="transparent" fill="#E54B4B" />
//     <Star size={16} stroke="transparent" fill="#E54B4B" />
//   </StyledRating>
// );

export default function BookUI({ book }) {
  const pageActions = [
    <Button>Download</Button>,
    <Button primary>Edit Book</Button>,
  ];

  const authors = book.author && book.author.map(a => a.name).join(', ');

  return (
    <section>
      <Helmet>
        <title>{book.title || 'Book'} - Book Details - Pluteum</title>
        <meta name="description" content="Description of File Management" />
      </Helmet>
      <PageHeader title="Book" actions={pageActions} />
      <BookLayout>
        <BookCover title={book.title} author={authors} />
        <BookDetails>
          <BookTitle>{book.title}</BookTitle>
          <Author>by {authors}</Author>
          {/* {rating} */}
          <Description>{book.description}</Description>
          {/* <FieldHeader style={{ marginTop: 25 }} as="p">
            Tags
          </FieldHeader> */}
          {/* <div style={{ marginTop: 15, marginBottom: 50 }}>
            {book.tags.map(tag => (
              <Tag>{tag}</Tag>
            ))}
          </div> */}
          {/* <hr
            style={{
              border: 0,
              borderBottom: '1px solid #DBDDE2',
            }}
          />
          <MetaHeader>Information</MetaHeader>
          <div>
            <div>
              <FieldHeader>Series</FieldHeader>
              <FieldContent>N/A</FieldContent>
            </div>
            <div>
              <FieldHeader>Genre</FieldHeader>
              <FieldContent>Fiction, Fantasy</FieldContent>
            </div>
            <div>
              <FieldHeader>Publisher</FieldHeader>
              <FieldContent>Lorem Ipsum</FieldContent>
            </div>
            <div>
              <FieldHeader>Publication Date</FieldHeader>
              <FieldContent>05/20/4202</FieldContent>
            </div>
            <div>
              <FieldHeader>Language</FieldHeader>
              <FieldContent>English</FieldContent>
            </div>
            <div>
              <FieldHeader>ISBN</FieldHeader>
              <FieldContent>978-0-307-59331-3</FieldContent>
            </div>
          </div> */}
        </BookDetails>
      </BookLayout>
    </section>
  );
}

BookUI.propTypes = {
  book: PropTypes.object,
};
