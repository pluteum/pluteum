import React from 'react';
import styled from 'styled-components';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import BookCoverInput from './BookCoverInput';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Form/Input/Book Cover Input',
  component: BookCoverInput,
  decorators: [withKnobs],
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 250px;
  display: block;
`;

export const StorybookBookCover = () => (
  <Container>
    <BookCoverInput
      onSubmit={action('onSubmit')}
      image={text('Image URL', '')}
    />
  </Container>
);

StorybookBookCover.story = {
  name: 'Book Cover Input',
};
