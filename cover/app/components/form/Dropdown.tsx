import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

function Dropdown({ useAutoWidth = true, theme, ...props }) {
  const [autoWidth, setAutoWidth] = useState(125);

  useEffect(() => {
    if (props.defaultValue) {
      setAutoWidth(10 * props.defaultValue.label.length + 20);
    }
  }, []);

  const onChange = e => {
    setAutoWidth(10 * e.label.length + 20);

    return props.onChange ? props.onChange(e) : null;
  };

  const customStyles = {
    container: provided => ({
      minWidth: useAutoWidth ? autoWidth : 125,
      ...provided,
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

  return (
    <Select
      styles={customStyles}
      isSearchable={false}
      {...props}
      onChange={onChange}
    />
  );
}

Dropdown.propTypes = {
  theme: PropTypes.object,
  useAutoWidth: PropTypes.bool,
};

export default withTheme(Dropdown);
