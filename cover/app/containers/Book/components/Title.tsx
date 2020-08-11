import React from 'react';
import styled, { css } from 'styled-components';
import AutosizeInput from 'react-input-autosize';
import FitText from 'react-textfit';

import { Field } from 'formik';

const sharedStyles = css`
  margin: 0;

  font-family: ${props => props.theme.type.display_serif};
  font-weight: normal;
  line-height: auto;

  color: ${props => props.theme.colors.black};

  @media (min-width: 768px) {
    line-height: 80px;
  }
`;

export const BookTitle = styled.h1`
  ${sharedStyles};
`;

export const BookTitleInput = styled(AutosizeInput)`
  > input {
    ${sharedStyles};

    min-width: 125px;

    padding: 0 10px;
    background: #dbdde2;

    font-size: 64px;

    border: 0;
    border-radius: 4px;

    outline: none;
  }
`;

export default function Title({ title, editing }: any) {
  if (editing) {
    return (
      <Field name="firstName">
        {({ field, form, meta }) => <BookTitleInput {...field} />}
      </Field>
    );
  }

  return (
    <FitText max={76} mode="single">
      <BookTitle>{title}</BookTitle>
    </FitText>
  );
}
