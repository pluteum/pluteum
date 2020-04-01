/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Tooltip from '../../components/common/Tooltip/Tooltip';

export default function HomePage() {
  return (
    <Tooltip icon="info" text="Testing Text">
      Try using a modifier to further focus your search!
    </Tooltip>
  );
}
