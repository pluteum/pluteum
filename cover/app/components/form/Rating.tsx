import React, { useState } from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { Star } from 'react-feather';

const RatingStar: AnyStyledComponent = styled(Star)`
  cursor: pointer;
  stroke: none;
  fill: ${(props: any) =>
    props.active ? props.theme.colors.red : props.theme.colors.lightGrey};
`;

export default function Rating({ rating, onRating }) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <RatingStar
        active={hoverIndex >= i + 1 || (!hoverIndex && rating >= i + 1)}
        onClick={() => onRating(i + 1)}
        onMouseEnter={() => setHoverIndex(i + 1)}
        onMouseLeave={() => setHoverIndex(0)}
      />,
    );
  }

  return <div>{stars}</div>;
}
