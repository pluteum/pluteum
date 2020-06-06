import React from 'react';
import Select from 'react-select';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

function Dropdown({ theme, ...props }) {
  const customStyles = {
    container: provided => ({
      ...provided,
      minWidth: 125,
    }),
    control: () => ({
      width: '100%',
      display: 'inline-flex',
      fontFamily: theme.type.sans_serif,
      fontWeight: 600,
      fontSize: 14,
      color: theme.colors.darkGrey,
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    menu: () => ({
      top: '100%',
      marginBottom: 4,
      marginTop: 8,
      position: 'absolute',
      width: '100%',
      zIndex: 1,
      boxSizing: 'border-box',
      background: theme.colors.white,
      borderRadius: 4,
    }),
    option: provided => ({
      ...provided,
      background: 'none',
      fontFamily: theme.type.sans_serif,
      fontSize: 14,
      color: theme.colors.darkGrey,
    }),
    ...props.styles,
  };

  return <Select styles={customStyles} {...props} />;
}

Dropdown.propTypes = {
  theme: PropTypes.object,
};

export default withTheme(Dropdown);
