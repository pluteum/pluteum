import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Title from './Title';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik';

export default {
  title: 'Screens/Book Details/Title',
  component: Title,
  decorators: [withKnobs],
};

export const StorybookTitle = () => (
  <Formik
    initialValues={{
      title: '1Q84',
    }}
    onSubmit={action('onSubmit')}
  >
    {props => (
      <Form>
        <Title
          title={props.values.title}
          name="title"
          editing={boolean('Editing', false)}
        />
      </Form>
    )}
  </Formik>
);

StorybookTitle.story = {
  name: 'Book Title',
};
