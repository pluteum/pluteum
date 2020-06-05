import React from 'react';

import BookUI from './ui';

export default function Book() {
  const book = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description:
      'The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.',
    tags: ['fiction', 'american', 'classic'],
  };
  return <BookUI book={book} />;
}
