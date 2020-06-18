import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import UploadModal from './UploadModal';

export default {
  title: 'Screens/Upload/UploadModal',
  component: UploadModal,
  decorators: [withKnobs],
};

export const StorybookUploadModal = () => (
  <UploadModal onUpload={() => null} uploadingFiles={[]} />
);

StorybookUploadModal.story = {
  name: 'Upload Modal',
};
