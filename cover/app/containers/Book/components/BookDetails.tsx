import React from 'react';
import styled from 'styled-components';

import BookCover from 'components/BookCover';
import PrimaryDetails from './PrimaryDetails';
import { Formik, Form } from 'formik';
import Button from 'components/form/Button';

const Layout = styled.div`
    padding: 10px;

    > div:first-child {
        float: left;
        width: 100px;

        margin-right: 15px;
    }

    @media (min-width: 768px) {
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
    }
`;

const DetailsLayout = styled.div`
    max-width: 640px;
`;

const MetaLayout = styled.div`
    padding-top: 10px;
    margin-top: 20px;

    border-top: 1px solid ${props => props.theme.colors.lightGrey};

    @media (min-width: 768px) {
        margin-top: 40px;
        padding-top: 20px;
    }
`;

const FieldGroup = styled.div`

`;

export const MetaHeader = styled.h2`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const FieldHeader = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
`;

export const FieldContent = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
`;

export default function BookDetails({ editing, book, onSubmit, onLoadAuthors, onAddAuthor }) {
  const authorString = !!book.author ? book.author.map((a) => a.name).join(', ') : '';
  const tags = !!book.tags ? book.tags.map((t) => t.name) : [];

  if (editing) {
    return (
      <Formik initialValues={book} onSubmit={onSubmit}>
        <Form>
          <Layout>
          <div>
              <BookCover title={book?.title} author={authorString} />
          </div>
          <DetailsLayout>
              <PrimaryDetails book={book} editing={editing} onLoadAuthors={onLoadAuthors} onAddAuthor={onAddAuthor}  />
          </DetailsLayout>
          </Layout>
          <Button>Submit</Button>
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
