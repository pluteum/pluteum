import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavIcon from 'components/NavIcon';
import { PlusCircle } from 'react-feather';

const StyledSVG = styled.svg`
  position: absolute;

  circle {
    transition: stroke-dashoffset 1s linear;

    stroke: ${props => props.theme.colors.notAsLightBlue};
    stroke-width: 2px;

    transform: rotate(-90deg);
    transform-origin: center;
  }

  circle#color {
    stroke: ${props => (props.error ? '#D52020' : props.theme.colors.primary)};
  }
`;

function SvgCircle({ error, percent }) {
  return (
    <StyledSVG
      error={error}
      width="38"
      height="38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="19" cy="19" r="18" fill="transparent" strokeDasharray="115" />
      <circle
        id="color"
        cx="19"
        cy="19"
        r="18"
        fill="transparent"
        strokeDasharray="115"
        strokeDashoffset={115 - 115 * percent}
      />
    </StyledSVG>
  );
}

SvgCircle.propTypes = {
  percent: PropTypes.number,
};

export default function UploadIcon({ onClick, uploadProgress, uploadError }) {
  return (
    <NavIcon onClick={onClick} as="button">
      {uploadProgress > 0 && (
        <SvgCircle error={uploadError} percent={uploadProgress} />
      )}
      <PlusCircle size={22} />
    </NavIcon>
  );
}

UploadIcon.propTypes = {
  onClick: PropTypes.func,
  uploadProgress: PropTypes.number,
  uploadError: PropTypes.bool,
};
