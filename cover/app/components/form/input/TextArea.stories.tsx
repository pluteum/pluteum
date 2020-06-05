import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import TextArea from './TextArea';

export default {
  title: 'Form/Input/TextArea',
  component: TextArea,
  decorators: [withKnobs],
};

export const StorybookTextArea = () => (
  <TextArea label={text('Label', 'Description')} />
);

StorybookTextArea.story = {
  name: 'TextArea',
};
