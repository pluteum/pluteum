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
    value={text('Value', 'Text')}
    label={text('Label', '')}
    error={text('Error', undefined)}
  />
);

StorybookText.story = {
  name: 'Text',
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/xO9UiLE8YtxCCzN7K5NPtr/Pluteum?node-id=0%3A4444',
    },
  },
};
