import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import BookThumbnail from './BookThumbnail';

export default {
  title: 'Common/Book Thumbnail',
  component: BookThumbnail,
  decorators: [withKnobs],
};

export const StorybookBookThumbnail = () => (
  <BookThumbnail
    image={text('Image URL', '')}
    title={text('Book Title', 'Title')}
    author={text('Book Author', 'Author')}
  />
);

StorybookBookThumbnail.story = {
  name: 'Book Thumbnail',
};
