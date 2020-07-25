import React from 'react';
import styled from 'styled-components';

import BookCoverInput from './BookCoverInput';
import { Formik, FormikProps, Form } from 'formik';

export default {
  title: 'Form/Input/Book Cover Input',
  component: BookCoverInput,
  decorators: [],
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 250px;
  display: block;
`;

interface Values {
  file: File;
}

export const StorybookBookCover = () => (
  <Container>
    <Formik
      initialValues={{
        file: undefined,
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props: FormikProps<Values>) => (
        <Form>
          <BookCoverInput name="file" />
        </Form>
      )}
    </Formik>
  </Container>
);

StorybookBookCover.story = {
  name: 'Book Cover Input',
};
