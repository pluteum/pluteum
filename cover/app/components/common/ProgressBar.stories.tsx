import React from 'react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import ProgressBar from './ProgressBar';

export default {
  title: 'Common/Progress Bar',
  component: ProgressBar,
  decorators: [withKnobs],
};

export const StorybookProgressBar = () => (
  <ProgressBar
    percent={number('Percent', 0.1)}
    error={boolean('Error', false)}
  />
);

StorybookProgressBar.story = {
  name: 'Progress Bar',
};
