import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import BookIndex from './BookIndex';

export default {
  title: 'Screens/Index/BookIndex',
  component: BookIndex,
  decorators: [withKnobs],
};

const SampleBooks = [
  {
    title: '1Q84',
    author: 'Haruki Murakami',
  },
  {
    title: "The Adventure's of Huckleberry Finn",
    author: 'Mark Twain',
  },
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Hatchet',
    author: 'Gary Paulsen',
  },
  {
    title: 'Star Wars: Thrawn',
    author: 'Timothy Zahn',
  },
];

export const StorybookBookIndex = () => <BookIndex books={SampleBooks} />;

StorybookBookIndex.story = {
  name: 'With Books (No Covers)',
};
