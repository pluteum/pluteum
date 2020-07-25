import React from 'react';

import BookDetails from './components/BookDetails';
import { useQuery } from 'react-apollo';
import { GET_BOOK } from './queries';

export default function Book({ match }) {
  const { data: { getBook = {} } = {} } = useQuery(GET_BOOK, {
    variables: { id: parseInt(match.params.id) },
  });

  return (
    <BookDetails
      book={getBook}
      onRating={() => {}}
      onNewTag={() => {}}
      onDeleteTag={() => {}}
    />
  );
}
