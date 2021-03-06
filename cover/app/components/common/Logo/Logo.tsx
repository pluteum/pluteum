/*
 * Logo
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSVG: any = styled.svg`
  width: 100%;
  color: ${props => props.theme.colors.primary};

  &:hover {
    color: ${props => props.theme.colors.primary__hover};
  }
`;

export default function Logo({
  className = undefined,
  icon = false,
  ...props
}): any {
  if (icon) {
    return (
      <StyledSVG
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 28"
        {...props}
      >
        <g fill="none" fillRule="evenodd">
          <path
            d="M10.61 19.088H0L4.5 0h9.927c2.9 0 5.045 2.688 4.382 5.495l-2.065 8.76c-.668 2.83-3.208 4.833-6.135 4.833zM20.926 5.64c1.835.87 2.95 2.928 2.448 5.06l-2.066 8.758c-.667 2.832-3.209 4.834-6.136 4.834h-8.17l-.83 3.52-2.596-2.004L0 27.814l1.498-6.347h11.28c2.928 0 5.47-2.003 6.137-4.834l2.066-8.76a4.406 4.406 0 00-.054-2.232z"
            fill="currentColor"
          />
        </g>
      </StyledSVG>
    );
  }

  return (
    <StyledSVG className={className} width="113" height="24" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M17.475 4.712c1.532.727 2.464 2.447 2.044 4.227l-1.725 7.317a5.256 5.256 0 01-5.124 4.038H5.848l-.693 2.94-2.168-1.674L0 23.234l1.25-5.3h9.42a5.256 5.256 0 005.125-4.039l1.725-7.318a3.68 3.68 0 00-.045-1.865zM12.048 0c2.423 0 4.213 2.244 3.66 4.59l-1.725 7.318a5.257 5.257 0 01-5.124 4.037H0L3.758.001h8.29z"
          fill="#0A4FCD"
        />
        <path
          d="M108.182 7.712c2.789 0 4.626 1.983 4.626 5.042v7.54h-3.158v-7.32c0-1.444-.735-2.324-2.056-2.324-1.395 0-2.277.93-2.277 2.766v6.879h-3.157v-7.32c0-1.445-.736-2.325-2.057-2.325-1.347 0-2.301.93-2.301 2.766v6.879h-3.157v-1.372c-.734 1.102-2.008 1.714-3.648 1.714-2.594 0-4.627-1.811-4.627-5.068V8.055h3.159v7.123c0 1.664 1.003 2.52 2.423 2.52 1.542 0 2.693-.904 2.693-3.034v-6.61h3.157v1.299c.685-1.03 1.836-1.641 3.403-1.641 1.518 0 2.643.636 3.329 1.763.759-1.102 1.982-1.763 3.648-1.763zm-55.87.342v7.123c0 1.665 1.004 2.522 2.424 2.522 1.542 0 2.693-.906 2.693-3.036V8.054h3.158v12.24h-3.158v-1.37c-.735 1.1-2.008 1.712-3.648 1.712-2.594 0-4.627-1.81-4.627-5.067V8.054h3.159zm25.855-.342c3.622 0 6.193 2.864 6.193 6.462 0 .466-.049.882-.123 1.298H75.01c.44 1.615 1.787 2.3 3.451 2.3 1.224 0 2.204-.513 2.742-1.223l2.546 1.469c-1.15 1.664-2.986 2.619-5.337 2.619-4.11 0-6.707-2.815-6.707-6.463 0-3.647 2.62-6.462 6.463-6.462zM67.713 4.628v3.427h3.26l-.712 3.034h-2.548v5.092c0 1.322.955 1.346 2.767 1.25v2.863c-4.431.49-5.925-.809-5.925-4.113V11.09h-2.157l.028-3.034h2.129V5.582l3.158-.954zM46.46 2.425v17.87h-3.158V2.425h3.158zm-11.067.733c3.306 0 5.85 2.547 5.85 5.753 0 3.207-2.544 5.752-5.85 5.752h-3.011v5.631h-3.379v-5.631h-2.387l.744-3.157h1.643V3.158zm42.773 7.394c-1.689 0-2.84.906-3.207 2.472h6.242c-.392-1.762-1.714-2.472-3.035-2.472zM35.394 6.317h-3.011v5.189h3.01c1.444 0 2.498-1.126 2.498-2.595 0-1.493-1.053-2.594-2.497-2.594z"
          fill="#131314"
        />
      </g>
    </StyledSVG>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.bool,
};
