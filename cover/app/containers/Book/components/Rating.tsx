import React, { useState, ChangeEvent } from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { Star } from 'react-feather';
import { Field, FieldProps } from 'formik';

const RatingStar: AnyStyledComponent = styled(Star)`
  cursor: pointer;
  stroke: none;
  fill: ${(props: any) =>
    props.active ? props.theme.colors.red : props.theme.colors.lightGrey};
  pointer-events: ${(props: any) => (props.editing ? 'all' : 'none')};
`;

interface Props {
  rating: number;
  editing?: boolean;
}

export default function Rating({ rating, editing }: Props) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const stars = [];

  if (editing) {
    return (
      <Field name="rating">
        {({ field, form }: FieldProps) => {
          function onRating(num: number) {
            return form.setFieldValue(field.name, num);
          }

          for (let i = 0; i < 5; i++) {
            stars.push(
              <RatingStar
                active={hoverIndex >= i + 1 || (!hoverIndex && rating >= i + 1)}
                onClick={() => onRating(i + 1)}
                onMouseEnter={() => setHoverIndex(i + 1)}
                onMouseLeave={() => setHoverIndex(0)}
                editing
              />,
            );
          }

          return <div>{stars}</div>;
        }}
      </Field>
    );
  }

  for (let i = 0; i < 5; i++) {
    stars.push(
      <RatingStar
        active={hoverIndex >= i + 1 || (!hoverIndex && rating >= i + 1)}
      />,
    );
  }

  return <div>{stars}</div>;
}
