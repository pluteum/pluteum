/*
 * Tooltip
 */

import React, { useState } from 'react';
import { Manager, Reference, Popper } from 'react-popper';

import propTypes from 'prop-types';
import InfoIcon from '../../../images/icons/info.svg';
import { Arrow, TooltipButton, TooltipContent } from './styles';

export default function Tooltip({ icon, text, children }) {
  let iconEl = <img className="icon" src={InfoIcon} alt="Info" />;
  const [visible, setVisible] = useState(true);

  switch (icon) {
    case 'info':
      iconEl = <img className="icon" src={InfoIcon} alt="Info" />;
      break;
    case 'question':
      iconEl = <img className="icon" src={InfoIcon} alt="Info" />;
      break;
    default:
      break;
  }

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <TooltipButton
            onClick={() => setVisible(true)}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            ref={ref}
          >
            {iconEl}
            <span>{text}</span>
          </TooltipButton>
        )}
      </Reference>
      {visible && (
        <Popper placement="top">
          {({ ref, style, placement, arrowProps }) => (
            <TooltipContent ref={ref} style={style} data-placement={placement}>
              {children}
              <Arrow
                ref={arrowProps.ref}
                style={arrowProps.style}
                data-placement={placement}
              />
            </TooltipContent>
          )}
        </Popper>
      )}
    </Manager>
  );
}

Tooltip.propTypes = {
  icon: propTypes.oneOf(['info', 'question']),
  text: propTypes.string,
  children: propTypes.oneOfType([propTypes.string, propTypes.node]),
};
