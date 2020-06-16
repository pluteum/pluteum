import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import IndexEmptyState from './components/EmptyState';

import { GET_BOOKS } from './queries';

const Wrapper = styled.main`
  background: ${props => props.theme.colors.offWhite};
`;

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
    return (
      <Wrapper>
        <IndexEmptyState />
      </Wrapper>
    );
  }

  return <span />;
}
