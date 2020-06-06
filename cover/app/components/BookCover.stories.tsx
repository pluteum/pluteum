import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import BookCover from './BookCover';

export default {
  title: 'Common/Book Cover',
  component: BookCover,
  decorators: [withKnobs],
};

export const StorybookBookCover = () => (
  <BookCover
    image={text('Image URL', '')}
    title={text('Book Title', 'Title')}
    author={text('Book Author', 'Author')}
  />
);

StorybookBookCover.story = {
  name: 'Book Cover',
};
