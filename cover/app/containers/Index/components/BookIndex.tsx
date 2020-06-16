import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PageHeader from '../../../components/common/PageHeader';
import BookThumbnail from '../../../components/BookThumbnail';
import Dropdown from '../../../components/form/Dropdown';

const Layout = styled.section`
  height: 100%;
`;

const ThumbnailGrid = styled.div`
  height: calc(100% - 81px);
  overflow-y: auto;

  display: grid;

  padding: 22px 50px;

  grid-template-columns: repeat(auto-fit, minmax(166px, 1fr));
  grid-column-gap: 70px;
  grid-row-gap: 80px;
`;

export default function BookIndex({ books = [] }) {
  const BookCovers = books.map(book => (
    <BookThumbnail
      title={book.title}
      author={book.author.map(a => a.name).join(', ')}
    />
  ));

  const displayOptions = [
    { label: 'Grid View', value: 'grid' },
    { label: 'Table View', value: 'table' },
  ];

  const viewOptions = [{ label: 'Sort by latest upload', value: 'recent' }];

  const Actions = [
    <Dropdown defaultValue={displayOptions[0]} options={displayOptions} />,
    <Dropdown defaultValue={viewOptions[0]} options={viewOptions} />,
  ];

  return (
    <Layout>
      <PageHeader title="Library" actions={Actions} />
      <ThumbnailGrid>{BookCovers}</ThumbnailGrid>
    </Layout>
  );
}

BookIndex.propTypes = {
  books: PropTypes.array,
};
