import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import UploadProgress from './UploadProgress';

export default {
  title: 'Screens/Upload/Upload Progress',
  component: UploadProgress,
  decorators: [withKnobs],
};

export const StorybookUploadProgress = () => <UploadProgress />;

StorybookUploadProgress.story = {
  name: 'Upload Progress',
};
