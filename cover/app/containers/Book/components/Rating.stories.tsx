import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik';

import Rating from './Rating';
import Button from 'components/form/Button';

export default {
  title: 'Screens/Book Details/Rating',
  component: Rating,
  decorators: [withKnobs],
};

export const StorybookRating = () => (
  <Formik
    initialValues={{
      rating: 5,
    }}
    onSubmit={action('onSubmit')}
  >
    {props => (
      <Form>
        <Rating
          rating={props.values.rating}
          editing={boolean('Editing', false)}
        />
        <Button style={{ marginTop: 25 }}>Submit</Button>
      </Form>
    )}
  </Formik>
);

StorybookRating.story = {
  name: 'Book Rating',
};
