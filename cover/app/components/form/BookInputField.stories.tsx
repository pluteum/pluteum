import React from 'react';
import FitText from 'react-textfit';

import { withKnobs, text } from '@storybook/addon-knobs';

import { TitleInput } from './BookInputField';

export default {
  title: 'Form/Input/Book Input Field',
  component: Text,
  decorators: [withKnobs],
};

export const StorybookBookInputField = () => (
  <FitText max={76} mode="single">
    <TitleInput defaultValue={text('Value', '1Q84')} />
  </FitText>
);

StorybookBookInputField.story = {
  name: 'Book Input Field',
  parameters: {},
};
