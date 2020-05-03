/*
 * Input
 */

import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-family: 'IBM Plex Sans';
    font-weight: 500;
    font-size: 16px;
    color: #494b4f;
    line-height: 22px;
    margin-bottom: 3px;
  }

  input,
  textarea {
    font-family: 'IBM Plex Sans';

    font-weight: 400;
    border: #bdc0c4 1px solid;
    border-radius: 4px;

    padding: 10px 13px;

    outline: none;
  }

  textarea {
    height: 85px;
  }
`;

export default function Input({ type, label, name }) {
  if (type === 'textarea') {
    return (
      <FormControl>
        <label>{label}</label>
        <textarea />
      </FormControl>
    );
  }

  return (
    <FormControl>
      <label htmlFor={name}>{label}</label>
      <input name={name} type={type} />
    </FormControl>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};
