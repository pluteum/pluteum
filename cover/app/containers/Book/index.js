import React from 'react';
import styled from 'styled-components';

import Button from 'components/form/Button';
import PageHeader from 'components/common/PageHeader';
import Typography from 'components/common/Type/Typography';
import Label from 'components/form/Label';
import ReactFitText from 'react-fittext';
import img from 'images/sample_book.png';
import { Star } from 'react-feather';

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
const BookDetails = styled.div``;

const BookTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 72px;
  font-weight: normal;
  font-family: ${props => props.theme.type.display_serif};
  color: ${props => props.theme.colors.black};
`;

const StyledRating = styled.div`
  margin: 26px 0 32px;

  svg {
    margin-right: 1px;
  }
`;

const BookDescription = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-size: 18px;
  line-height: 32px;

  color: ${props => props.theme.colors.darkGrey};
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

export default function Book() {
  const pageActions = [
    <Button>Download</Button>,
    <Button primary>Edit Book</Button>,
  ];

  return (
    <section>
      <PageHeader title="Book" actions={pageActions} />
      <BookLayout>
        <BookCover>
          <img src={img} alt="Book" />
        </BookCover>
        <BookDetails>
          <ReactFitText maxFontSize={72}>
            <BookTitle>The Great Gatsby</BookTitle>
          </ReactFitText>
          <Typography type="Author">by F. Scott Fitzgerald</Typography>
          {rating}
          <BookDescription>
            The Great Gatsby is a 1925 novel written by American author F. Scott
            Fitzgerald that follows a cast of characters living in the fictional
            towns of West Egg and East Egg on prosperous Long Island in the
            summer of 1922. The story primarily concerns the young and
            mysterious millionaire Jay Gatsby and his quixotic passion and
            obsession with the beautiful former debutante Daisy Buchanan.
          </BookDescription>
          <Label style={{ marginTop: 25 }} as="p">
            Tags
          </Label>
          <div style={{ marginTop: 15 }}>
            <Tag>fiction</Tag>
            <Tag>american</Tag>
            <Tag>classic</Tag>
          </div>
          <hr />
          <Typography type="SectionTitle">Information</Typography>
        </BookDetails>
      </BookLayout>
    </section>
  );
}
