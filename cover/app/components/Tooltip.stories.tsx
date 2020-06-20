import React, { forwardRef } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import Tooltip from './Tooltip';
import IconButton from './common/IconButton';
import { Maximize2 } from 'react-feather';

export default {
  title: 'Common/Tooltip',
  component: Tooltip,
  decorators: [withKnobs],
};

// const FwdedIconButton = forwardRef((props, ref) => {
//   return <IconButton ref={ref}>Reference</IconButton>;
// });

export const StorybookTooltip = () => (
  <Tooltip content="View individual file upload progress">
    <IconButton onClick={() => null}>
      <Maximize2 />
    </IconButton>
  </Tooltip>
);

StorybookTooltip.story = {
  name: 'Tooltip',
};
