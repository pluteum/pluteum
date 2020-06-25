import React from 'react';
import { withKnobs, object, number } from '@storybook/addon-knobs';

import Rating from './Rating';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Form / Input / Rating',
  component: Rating,
  decorators: [withKnobs],
};

export const StorybookDropdown = () => (
  <Rating rating={number('Rating', 3)} onRating={action('On Rating')} />
);

StorybookDropdown.story = {
  name: 'Ratings',
};
