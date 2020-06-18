import React from 'react';
import {
  withKnobs,
  text,
  number,
  object,
  boolean,
} from '@storybook/addon-knobs';

import UploadProgress from './UploadProgress';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Screens/Upload/Upload Progress',
  component: UploadProgress,
  decorators: [withKnobs],
};

export const StorybookUploadProgress = () => (
  <UploadProgress
    expanded={boolean('Expanded', false)}
    totalProgress={number('Total Progress', 0.16)}
    uploadingFiles={object('Uploading Files', [
      { name: '1Q84.pdf', progress: 0.3 },
      { name: '1984.epub', progress: 0.1 },
      { name: 'to_kill_a_mockingbird.pdf', progress: 1, error: new Error() },
    ])}
    onMinimize={action('onMinimize')}
  />
);

StorybookUploadProgress.story = {
  name: 'Upload Progress',
};
