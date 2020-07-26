import React from 'react';
import { Helmet } from 'react-helmet';

import Button from 'components/form/Button';
import PageHeader from 'components/common/PageHeader';
import BookDetails from './components/BookDetails';
import { useQuery } from 'react-apollo';
import { GET_BOOK } from './queries';

export default function Book({ match }) {
  const { data: { getBook: book = {} } = {} }: any = useQuery(GET_BOOK, {
    variables: { id: parseInt(match.params.id) },
  });

  const pageActions = [
    <Button>Download</Button>,
    <Button primary>Edit Book</Button>,
  ];

  return (
    <section>
      <Helmet>
        <title>{book?.title || 'Book'} - Book Details - Pluteum</title>
      </Helmet>
      <PageHeader title="Book" actions={pageActions} />
      <BookDetails
        editing={false}
        book={book}
        onRating={() => {}}
        onNewTag={() => {}}
        onDeleteTag={() => {}}
      />
    </section>
  );
}
