import React from 'react';
import styled from 'styled-components';

import BookCover from 'components/BookCover';
import PrimaryDetails from './PrimaryDetails';
import { Formik, Form } from 'formik';
import Button from 'components/form/Button';
import BookCoverInput from 'components/form/BookCoverInput';

const Layout = styled.div`
    padding: 10px;

    display: grid;

    max-width: 1040px;
    margin: 40px auto;

    grid-template-columns: 1fr 2fr;
    grid-column-gap: 64px;

    > div:first-child {
        float: none;
        width: auto;

        margin-right: unset;
    }    
    
`;

const DetailsLayout = styled.div`
    max-width: 640px;
`;

export default function BookDetails({ editing, book, onSubmit, onLoadAuthors, onAddAuthor, onLoadTags }) {
  const authorString = !!book.author ? book.author.map((a) => a.name).join(', ') : '';

  if (editing) {
    return (
      <Formik initialValues={book} onSubmit={onSubmit}>
        <Form>
          <Layout>
          <div>
              {editing ? <BookCoverInput name="image" image={book.image} /> : <BookCover image={book.image} title={book?.title} author={authorString} />}
          </div>
          <DetailsLayout>
              <PrimaryDetails book={book} editing={editing} onLoadAuthors={onLoadAuthors} onAddAuthor={onAddAuthor} onLoadTags={onLoadTags} />
          </DetailsLayout>
          </Layout>
        </Form>
      </Formik>
    );
  }

  return (
    <Layout>
        <div>
            <BookCover title={book?.title} author={authorString} />
        </div>
        <DetailsLayout>
            <PrimaryDetails book={book} editing={editing} />
        </DetailsLayout>
    </Layout>
  );
}
