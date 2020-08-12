import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import Button from 'components/form/Button';
import PageHeader from 'components/common/PageHeader';
import BookDetails from './components/BookDetails';
import { useQuery } from 'react-apollo';
import { GET_BOOK } from './queries';

export default function Book({ match }) {
  const [editing, setEditing] = useState(false);

  const { data: { getBook: book = {} } = {} }: any = useQuery(GET_BOOK, {
    variables: { id: parseInt(match.params.id) },
  });

  const pageActions = [
    <Button>Download</Button>,
    editing ? <Button primary onClick={() => setEditing(false)}>Save Changes</Button> : <Button primary onClick={() => setEditing(true)}>Edit Book</Button>,
  ];

  return (
    <section>
      <Helmet>
        <title>{book?.title || 'Book'} - Book Details - Pluteum</title>
      </Helmet>
      <PageHeader title="Book" actions={pageActions} />
      <BookDetails
        editing={editing}
        book={book}
        onSubmit={() => {}}
        onLoadAuthors={() => {}}
        onAddAuthor={() => {}}
        onLoadTags={() => {}}
      />
    </section>
  );
}
