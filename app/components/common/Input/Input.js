/*
 * Ratings
 */

import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 100;
    font-size: 12px;
    color: #555555;
    margin-bottom: 2px;
  }

  input {
    color: #222222;
    font-weight: 100;
    background-color: #f1f1f1;
    border: 0;

    width: 380px;
    height: 34px;
    padding: 0 13px;

    outline: none;
  }
`;

export default function Input({ label }) {
  return (
    <FormControl>
      <label>{label}</label>
      <input type="text" />
    </FormControl>
  );
}

Input.propTypes = {
  label: PropTypes.string,
};
