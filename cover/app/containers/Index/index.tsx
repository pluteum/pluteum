import React from 'react';
import { Helmet } from 'react-helmet';
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

  const helmet = (
    <Helmet>
      <title>Library - Pluteum</title>
    </Helmet>
  );

  if (books.length > 0) {
    return (
      <Wrapper>
        {helmet}
        <BookIndex books={books} />
      </Wrapper>
    );
  }

  if (!loading) {
    return (
      <Wrapper>
        {helmet}
        <IndexEmptyState />
      </Wrapper>
    );
  }

  return <span />;
}
