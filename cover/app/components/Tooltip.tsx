import styled from 'styled-components';
import Tippy from '@tippyjs/react';

const StyledTippy = styled(Tippy)`
  padding: 5px 8px;
  border-radius: 5px;

  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.darkGrey};

  font-family: ${props => props.theme.type.sans_serif};
  font-size: 14px;

  /* Styling the arrow for different placements */
  &[data-placement^='top'] > .tippy-arrow::before {
    border-top-color: purple;
  }
`;

export default StyledTippy;
