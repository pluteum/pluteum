import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Checkbox from 'components/form/input/Checkbox';
import { produce } from 'immer';

import IconButton from '../common/IconButton';
import Tag from '../common/Tag';

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  margin: 20px 0 25px;

  > ul {
    margin: 0;
    margin-left: 10px;
    padding: 0;
  }
`;

const StyledDropdown = styled.div`
  position: absolute;
  padding: 25px 35px;
  background: ${props => props.theme.colors.white};
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  top: 40px;
  z-index: 10;
  min-width: 180px;

  > p {
    margin: 0 0 10px;
    font-weight: 600;
    font-family: ${props => props.theme.type.sans_serif};
    font-size: 16px;
    color: ${props => props.theme.colors.darkGrey};
    line-height: 22px;
  }

  h1 {
    margin-bottom: 10px;
  }
`;

export default function Filter({ defaultOptions = [], options = [] }) {
  const [activeFilters, setFilters] = useState(defaultOptions);
  const [drawerOpen, setDrawer] = useState(false);

  const handleBlur = e => {
    const { currentTarget } = e;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setDrawer(false);
      }
    }, 0);
  };

  function toggleFilter(option) {
    if (activeFilters.includes(option)) {
      setFilters(
        produce(activeFilters, draft => {
          draft.splice(draft.indexOf(option), 1);
        }),
      );
    } else {
      setFilters(produce(activeFilters, draft => [...draft, option]));
    }
  }

  const filterCheckboxes = options.map(option => (
    <Checkbox
      onChange={() => toggleFilter(option)}
      checked={activeFilters.includes(option)}
      name={option}
      label={option}
    />
  ));

  const filterOptions = activeFilters.map(option => (
    <Tag onDelete={() => toggleFilter(option)}>{option}</Tag>
  ));

  return (
    <StyledContainer onBlur={handleBlur}>
      <IconButton icon={faFilter} onClick={() => setDrawer(!drawerOpen)} />
      {drawerOpen && (
        <StyledDropdown>
          <p>Status:</p>
          {filterCheckboxes}
        </StyledDropdown>
      )}
      {/* dropdownn here */}
      <ul>{filterOptions}</ul>
    </StyledContainer>
  );
}

Filter.propTypes = {
  defaultOptions: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.string),
};
