import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Button from './Button';

export default {
  title: 'Form/Button',
  component: Button,
  decorators: [withKnobs],
};

export const StorybookButton = () => (
  <Button primary={boolean('Primary', true)} onClick={action('button-click')}>
    {text('Label', 'Button')}
  </Button>
);

StorybookButton.story = {
  name: 'Button',
};
