/*
 *
 * BookIndex
 *
 */
import React, { memo } from 'react';

import Typography from '../../components/common/Type/Typography';

export function BookIndex() {
  return (
    <React.Fragment>
      <Typography type="SectionTitle">Your Library</Typography>
      <ul />
    </React.Fragment>
  );
}

BookIndex.propTypes = {};

export default memo(BookIndex);
