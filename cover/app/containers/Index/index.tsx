import React from 'react';
import { useQuery } from 'react-apollo';

import IndexEmptyState from './EmptyState';

import { GET_BOOKS } from './queries';

export default function Index() {
  const { data: { books = [] } = {}, loading, error } = useQuery(GET_BOOKS);

  if (books.length > 0) {
    return (
      <div>
        {books.map(book => (
          <p>
            {book.title} – {book.author.map(author => author.name).join(', ')}
          </p>
        ))}
      </div>
    );
  }

  if (!loading) {
    return <IndexEmptyState />;
  }

  return <span />;
}
