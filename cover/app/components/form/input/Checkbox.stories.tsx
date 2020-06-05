import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Checkbox from './Checkbox';

export default {
  title: 'Form/Input/Checkbox',
  component: Checkbox,
  decorators: [withKnobs],
};

export const StorybookCheckbox = () => (
  <Checkbox label={text('Label', 'Accept Terms')} />
);

StorybookCheckbox.story = {
  name: 'Checkbox',
};
