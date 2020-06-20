import React from 'react';
import { withKnobs, object } from '@storybook/addon-knobs';

import Dropdown from './Dropdown';

export default {
  title: 'Select',
  component: Dropdown,
  decorators: [withKnobs],
};

export const StorybookDropdown = () => (
  <Dropdown
    options={object('Dropdown Options', [
      { label: 'Grid View', value: 'grid' },
      { label: 'Table View', value: 'table' },
    ])}
  />
);

StorybookDropdown.story = {
  name: 'Dropdown',
};
