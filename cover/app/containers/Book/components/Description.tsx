import React from 'react';
import styled, { css } from 'styled-components';
import { Field } from 'formik';

const sharedStyles = css`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: ${props => props.theme.colors.darkGrey};
  margin: 19px 0 25px;

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 32px;
  }
`;

export const DescriptionText = styled.h1`
  ${sharedStyles}
`;

export const DescriptionInput = styled.textarea`
  ${sharedStyles}

  width: 100%;
  height: 225px;

  padding: 10px;
  background: #dbdde2;

  border: 0;
  border-radius: 4px;

  resize: none;
`;

export default function Description({ description, editing }: any) {
  if (editing) {
    return <Field name="description" as={DescriptionInput} />;
  }

  return <DescriptionText>{description}</DescriptionText>;
}
