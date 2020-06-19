import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import UploadInput from './UploadInput';

export default {
  title: 'Screens/Upload/Screens/Upload Input',
  component: UploadInput,
  decorators: [withKnobs],
};

export const StorybookUploadInput = () => <UploadInput onUpload={() => null} />;

StorybookUploadInput.story = {
  name: 'Upload Input',
};
