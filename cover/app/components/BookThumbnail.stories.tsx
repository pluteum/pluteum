import React from 'react';
import { MemoryRouter } from 'react-router';
import { withKnobs, text } from '@storybook/addon-knobs';

import BookThumbnail from './BookThumbnail';

export default {
  title: 'Common/Book Thumbnail',
  component: BookThumbnail,
  decorators: [withKnobs],
};

export const StorybookBookThumbnail = () => (
  <MemoryRouter>
    <BookThumbnail
      id="0"
      image={text('Image URL', '')}
      title={text('Book Title', 'Title')}
      author={text('Book Author', 'Author')}
    />
  </MemoryRouter>
);

StorybookBookThumbnail.story = {
  name: 'Book Thumbnail',
};
