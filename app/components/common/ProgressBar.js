import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';

const Bar = styled.div`
  width: 100%;
  height: 8px;
  background: #dbdde2;
  border-radius: 4px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    background: #0a4fcd;
    height: 8px;
    width: ${props => props.percent * 100}%;
    border-radius: 4px;
    transition: width 0.5s ease-in;
  }
`;

export default function ProgressBar({ percent }) {
  return <Bar percent={percent} />;
}

ProgressBar.propTypes = {
  percent: PropType.number,
};
