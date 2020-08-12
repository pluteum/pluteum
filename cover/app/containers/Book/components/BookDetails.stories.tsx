import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import faker from 'faker';

import BookDetails from './BookDetails';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Screens/Book Details',
  component: BookDetails,
  decorators: [withKnobs],
};

let book = {
  title: '1Q84',
  author: [{ id: 0, name: 'Haruki Murakami' }],
  description:
    'A young woman named Aomame follows a taxi driver’s enigmatic suggestion and begins to notice puzzling discrepancies in the world around her. She has entered, she realizes, a parallel existence, which she calls 1Q84 —“Q is for ‘question mark.’ A world that bears a question.” Meanwhile, an aspiring writer named Tengo takes on a suspect ghostwriting project. He becomes so wrapped up with the work and its unusual author that, soon, his previously placid life begins to come unraveled.',
  rating: 4,
  tags: [{ id: 0, name: 'fiction' }],
};

const authors = [];

for (let i = 0; i < 100; i++) {
  authors.push({
    value: faker.random.number(),
    label: faker.name.findName(),
  });
}

const tags = [];

for (let i = 0; i < 100; i++) {
  tags.push({
    value: faker.random.number(),
    label: faker.name.jobArea(),
  });
}

function onSubmit(values) {
  action('onSubmit')(values);
  book = values;
  return Promise.resolve();
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

function onLoadTags() {
  action('onLoadTags')();
  return new Promise((resolve, reject) => setTimeout(() => resolve(tags), 250));
}

export const StorybookBookDetails = () => (
  <BookDetails
    book={book}
    onSubmit={onSubmit}
    onAddAuthor={onCreateAuthor}
    onLoadAuthors={onLoadAuthors}
    onLoadTags={onLoadTags}
    editing={boolean('Editing', false)}
  />
);

StorybookBookDetails.story = {
  name: 'Book Details',
};
