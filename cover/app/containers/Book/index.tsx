import React from 'react';

import BookUI from './ui';
import { useQuery } from 'react-apollo';
import { GET_BOOK } from './queries';

export default function Book({ match }) {
  const { data: { getBook = {} } = {}, loading, error } = useQuery(GET_BOOK, {
    variables: { id: parseInt(match.params.id) },
  });

  return <BookUI book={getBook} />;
}
