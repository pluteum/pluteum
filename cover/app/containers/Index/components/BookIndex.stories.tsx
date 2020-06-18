import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import BookIndex from './BookIndex';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Screens/Index/BookIndex',
  component: BookIndex,
  decorators: [withKnobs],
};

const SampleBooks = [
  {
    title: '1Q84',
    author: [{ name: 'Haruki Murakami' }],
  },
  {
    title: "The Adventure's of Huckleberry Finn",
    author: [{ name: 'Mark Twain' }],
  },
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: [{ name: 'J.K. Rowling' }],
  },
  {
    title: 'Hatchet',
    author: [{ name: 'Gary Paulsen' }],
  },
  {
    title: 'Star Wars: Thrawn',
    author: [{ name: 'Timothy Zahn' }],
  },
];

export const StorybookBookIndex = () => (
  <MemoryRouter>
    <BookIndex books={SampleBooks} />
  </MemoryRouter>
);

StorybookBookIndex.story = {
  name: 'With Books (No Covers)',
};
