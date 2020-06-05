import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/form/Button';
import PageHeader from 'components/common/PageHeader';
import ReactFitText from 'react-fittext';
import { Star } from 'react-feather';

import {
  BookTitle,
  Author,
  Description,
  // MetaHeader,
  FieldHeader,
  // FieldContent,
  Tag,
} from './styles';

const BookLayout = styled.div`
  display: grid;
  max-width: 1040px;
  margin: 40px auto;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 64px;
`;

const BookCover = styled.div`
  display: block;
  min-width: 332px;
  height: 512px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);

  img {
    max-width: 100%;
  }
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

const rating = (
  <StyledRating>
    <Star size={16} stroke="transparent" fill="#E54B4B" />
    <Star size={16} stroke="transparent" fill="#E54B4B" />
    <Star size={16} stroke="transparent" fill="#E54B4B" />
    <Star size={16} stroke="transparent" fill="#E54B4B" />
    <Star size={16} stroke="transparent" fill="#E54B4B" />
  </StyledRating>
);

export default function BookUI({ book }) {
  const pageActions = [
    <Button>Download</Button>,
    <Button primary>Edit Book</Button>,
  ];

  return (
    <section>
      <PageHeader title="Book" actions={pageActions} />
      <BookLayout>
        <BookCover>
          <img src={book.image} alt="Book" />
        </BookCover>
        <BookDetails>
          <ReactFitText maxFontSize={72}>
            <BookTitle>{book.title}</BookTitle>
          </ReactFitText>
          <Author>by {book.author}</Author>
          {rating}
          <Description>{book.description}</Description>
          <FieldHeader style={{ marginTop: 25 }} as="p">
            Tags
          </FieldHeader>
          <div style={{ marginTop: 15, marginBottom: 50 }}>
            {book.tags.map(tag => (
              <Tag>{tag}</Tag>
            ))}
          </div>
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
