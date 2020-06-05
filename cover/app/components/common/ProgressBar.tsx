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
    background: ${props =>
      props.error ? '#D52020' : props.theme.colors.primary};
    height: 8px;
    border-radius: 4px;
    transition: width 0.5s ease-in, background 0.5s ease-in;
    width: ${props => props.percent * 100}%;
  }
`;

export default function ProgressBar({ error, percent }) {
  return <Bar error={error} percent={percent} />;
}

ProgressBar.propTypes = {
  error: PropType.bool,
  percent: PropType.number,
};
