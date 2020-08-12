import React from 'react';
import styled from 'styled-components';
import Title from './Title';
import Author from './Author';
import Rating from './Rating';
import Description from './Description';
import Tags from './Tags';

const Layout = styled.div``;

export default function PrimaryDetails({
  book,
  editing,
  onAddAuthor,
  onLoadAuthors,
}: any) {
  return (
    <Layout>
      <Title title={book.title} editing={editing} />
      <Author
        name="author"
        authors={book.author}
        editing={editing}
        createAuthor={onAddAuthor}
        onLoadAuthors={onLoadAuthors}
      />
      <Rating rating={book.rating} editing={editing} />
      <Description description={book.description} editing={editing} />
      <Tags
        tags={book.tags}
        editable={false}
        onDeleteTag={() => {}}
        onNewTag={() => {}}
      />
    </Layout>
  );
}
