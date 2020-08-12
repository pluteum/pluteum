import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import faker from 'faker';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik';

import Author from './Author';

export default {
  title: 'Screens/Book Details/Author',
  component: Author,
  decorators: [withKnobs],
};

const authors = [];

for (let i = 0; i < 100; i++) {
  authors.push({
    value: faker.random.number(),
    label: faker.name.findName(),
  });
}

function onLoadAuthors() {
  action('onLoadAuthors')();
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

export const StorybookAuthor = () => (
  <Formik
    initialValues={{
      authors: [{ id: 0, name: 'Haruki' }],
    }}
    onSubmit={action('onSubmit')}
  >
    {props => (
      <Form>
        <Author
          authors={props.values.authors}
          name="authors"
          editing={boolean('Editing', false)}
          onLoadAuthors={onLoadAuthors}
          createAuthor={onCreateAuthor}
        />
      </Form>
    )}
  </Formik>
);

StorybookAuthor.story = {
  name: 'Book Author',
};
