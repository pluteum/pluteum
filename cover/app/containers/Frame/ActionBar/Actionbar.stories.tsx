import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import ActionBar from './index';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Navigation/Action Bar',
  component: ActionBar,
  decorators: [withKnobs],
};

export const StorybookBookIndex = () => (
  <MemoryRouter>
    <ActionBar
      uploadProgress={number('Upload Progress', 0)}
      uploadError={boolean('Upload Error', false)}
    />
  </MemoryRouter>
);

StorybookBookIndex.story = {
  name: 'Action Bar',
};
