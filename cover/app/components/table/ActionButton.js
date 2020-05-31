import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MoreHorizontal } from 'react-feather';

const MenuLayout = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  width: 100%;
  cursor: pointer;
  background: none;
  border: 0;
  appearance: none;
  outline: none;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  right: -10px;
  top: calc(100% + 5px);

  width: 140px;
  padding: 10px 0;

  border-radius: 4px;
  z-index: 10;

  background: ${props => props.theme.colors.white};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  > * {
    margin: 5px 0;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

export default function ActionButton({ options }) {
  const [open, toggleOpen] = useState(false);

  const handleBlur = e => {
    const { currentTarget } = e;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        toggleOpen(false);
      }
    }, 0);
  };

  return (
    <MenuLayout onBlur={handleBlur}>
      <MenuButton onClick={() => toggleOpen(!open)} type="button">
        <MoreHorizontal color={open ? '#0A4FCD' : '#494B4F'} />
      </MenuButton>
      {open && <MenuList>{options}</MenuList>}
    </MenuLayout>
  );
}

ActionButton.propTypes = {
  options: PropTypes.array,
};
