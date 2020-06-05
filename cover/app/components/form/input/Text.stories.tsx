import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Text from './Text';

export default {
  title: 'Form/Input/Text',
  component: Text,
  decorators: [withKnobs],
};

export const StorybookText = () => (
  <Text
    label={text('Label', 'Email Address')}
    error={text('Error', undefined)}
  />
);

StorybookText.story = {
  name: 'Text',
};
