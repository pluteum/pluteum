import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import EmptyState from './EmptyState';

export default {
  title: 'Screens/Index/EmptyState',
  component: EmptyState,
  decorators: [withKnobs],
};

export const StorybookTextArea = () => <EmptyState />;

StorybookTextArea.story = {
  name: 'EmptyState',
};
