import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import IndexEmptyState from './components/EmptyState';

import { GET_BOOKS } from './queries';
import BookIndex from './components/BookIndex';

const Wrapper = styled.main`
  height: 100%;

  background: ${props => props.theme.colors.offWhite};
`;

export default function Index() {
  const { data: { books = [] } = {}, loading } = useQuery(GET_BOOKS);

  if (books.length > 0) {
    return (
      <Wrapper>
        <BookIndex books={books} />
      </Wrapper>
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
