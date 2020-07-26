import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import BookDetails from './BookDetails';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Screens/Book Details',
  component: BookDetails,
  decorators: [withKnobs],
};

export const StorybookBookDetails = () => (
  <BookDetails
    book={{
      title: '1Q84',
      author: [{ name: 'Haruki Murakami' }],
      description:
        'A young woman named Aomame follows a taxi driver’s enigmatic suggestion and begins to notice puzzling discrepancies in the world around her. She has entered, she realizes, a parallel existence, which she calls 1Q84 —“Q is for ‘question mark.’ A world that bears a question.” Meanwhile, an aspiring writer named Tengo takes on a suspect ghostwriting project. He becomes so wrapped up with the work and its unusual author that, soon, his previously placid life begins to come unraveled.',
      rating: 4,
      tags: [{ name: 'fiction' }, { name: 'alternate history' }],
    }}
    onRating={action('On Rating')}
    onNewTag={action('On New Tag')}
    onDeleteTag={action('On Delete Tag')}
    editing={boolean('Editing', false)}
  />
);

StorybookBookDetails.story = {
  name: 'Book Details',
};
