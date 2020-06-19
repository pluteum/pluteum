import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import UploadModal from './UploadModal';

export default {
  title: 'Screens/Upload/UploadModal',
  component: UploadModal,
  decorators: [withKnobs],
};

export const StorybookUploadModal = () => (
  <UploadModal
    files={new Map()}
    errors={new Map()}
    totalProgress={0}
    onExit={() => null}
    onUpload={() => null}
  />
);

StorybookUploadModal.story = {
  name: 'Upload Modal',
};
