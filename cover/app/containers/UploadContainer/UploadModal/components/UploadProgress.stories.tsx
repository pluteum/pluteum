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
  title: 'Screens/Upload/Screens/Upload Progress',
  component: UploadProgress,
  decorators: [withKnobs],
};

export const StorybookUploadProgress = () => (
  <UploadProgress
    expanded={boolean('Expanded', false)}
    totalProgress={number('Total Progress', 0.16)}
    files={object('Uploading Files', new Map())}
    errors={object('Errored Files', new Map())}
    onMinimize={action('onMinimize')}
  />
);

StorybookUploadProgress.story = {
  name: 'Upload Progress',
};
