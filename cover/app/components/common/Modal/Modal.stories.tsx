import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Modal from './Modal';
import IconButton from '../IconButton';
import { Maximize2 as Maximize, X } from 'react-feather';
import Tooltip from 'components/Tooltip';

export default {
  title: 'Common/Modal',
  component: Modal,
  decorators: [withKnobs],
};

const actions = [
  <Tooltip visible content="View individual file upload progress">
    <IconButton onClick={() => null}>
      <Maximize size={18} />
    </IconButton>
  </Tooltip>,
  <IconButton>
    <X size={18} />
  </IconButton>,
];

export const StorybookModal = () => <Modal actions={actions} />;

StorybookModal.story = {
  name: 'Modal',
};
