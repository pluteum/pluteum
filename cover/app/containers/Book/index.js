import React from 'react';
import styled from 'styled-components';

import Button from 'components/form/Button';
import PageHeader from 'components/common/PageHeader';
import Typography from 'components/common/Type/Typography';

import img from 'images/sample_book.png';

const BookLayout = styled.div`
  display: grid;
  max-width: 1040px;
  margin: 40px auto;
  grid-template-columns: 33% 66%;
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
          <Typography type="BookTitle">The Great Gatsby</Typography>
          <Typography type="Author">by F. Scott Fitzgerald</Typography>
          {/* ratings */}
          <Typography type="Paragraph">
            The Great Gatsby is a 1925 novel written by American author F. Scott
            Fitzgerald that follows a cast of characters living in the fictional
            towns of West Egg and East Egg on prosperous Long Island in the
            summer of 1922. The story primarily concerns the young and
            mysterious millionaire Jay Gatsby and his quixotic passion and
            obsession with the beautiful former debutante Daisy Buchanan.
            Considered to be Fitzgerald's magnum opus, The Great Gatsby explores
            themes of decadence, idealism, resistance to change, social upheaval
            and excess, creating a portrait of the Roaring Twenties that has
            been described as a cautionary tale regarding the American Dream.
          </Typography>
          {/* tags */}
        </BookDetails>
      </BookLayout>
    </section>
  );
}
