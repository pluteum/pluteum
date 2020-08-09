import React from 'react';

import { withKnobs, text } from '@storybook/addon-knobs';

import BookAuthorInput from './BookAuthorInput';
import { action } from '@storybook/addon-actions';
import faker from 'faker';
import { Formik, Form } from 'formik';
import Button from './Button';

export default {
  title: 'Form/Input/Book Author Field',
  component: BookAuthorInput,
  decorators: [withKnobs],
};

const Book = {
  authors: [
    {
      id: faker.random.number(),
      name: faker.name.findName(),
    },
  ],
};

const authors = [];

for (let i = 0; i < 100; i++) {
  authors.push({
    value: faker.random.number(),
    label: faker.name.findName(),
  });
}

function onLoadAuthors() {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(authors), 250),
  );
}

function onCreateAuthor(value) {
  action('onCreateAuthor')(value);
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve({ name: value, id: faker.random.number() }), 500),
  );
}

export const StorybookAuthorInput = () => (
  <Formik onSubmit={action('onSubmit')} initialValues={Book}>
    <Form>
      <BookAuthorInput
        name="authors"
        createAuthor={onCreateAuthor}
        onLoadAuthors={onLoadAuthors}
      />
      <Button style={{ marginTop: 25 }} type="submit">
        Submit
      </Button>
    </Form>
  </Formik>
);

StorybookAuthorInput.story = {
  name: 'Book Author Field',
  parameters: {},
};
