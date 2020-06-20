import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Modal from './Modal';
import IconButton from '../IconButton';
import { Maximize2 as Maximize, X } from 'react-feather';

export default {
  title: 'Common/Modal',
  component: Modal,
  decorators: [withKnobs],
};

const actions = [
  <IconButton tooltip="View total file upload progress">
    <Maximize size={18} />
  </IconButton>,
  <IconButton>
    <X size={18} />
  </IconButton>,
];

export const StorybookModal = () => <Modal actions={actions} />;

StorybookModal.story = {
  name: 'Modal',
};
