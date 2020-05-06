import React from 'react';
import PropTypes from 'prop-types';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';
import Tag from './Tag';

export default function Filter({ options = ['memes'] }) {
  const filterOptions = options.map(option => (
    <Tag onDelete={() => null}>{option}</Tag>
  ));

  return (
    <div>
      <IconButton icon={faFilter} />
      {/* dropdownn here */}
      {filterOptions}
    </div>
  );
}

Filter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
};
