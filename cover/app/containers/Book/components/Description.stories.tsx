import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Description from './Description';
import { action } from '@storybook/addon-actions';
import { Formik, Form } from 'formik';

export default {
  title: 'Screens/Book Details/Description',
  component: Description,
  decorators: [withKnobs],
};

export const StorybookDescription = () => (
  <Formik
    initialValues={{
      description:
        'A young woman named Aomame follows a taxi driver’s enigmatic suggestion and begins to notice puzzling discrepancies in the world around her. She has entered, she realizes, a parallel existence, which she calls 1Q84 —“Q is for ‘question mark.’ A world that bears a question.” Meanwhile, an aspiring writer named Tengo takes on a suspect ghostwriting project. He becomes so wrapped up with the work and its unusual author that, soon, his previously placid life begins to come unraveled.',
    }}
    onSubmit={action('onSubmit')}
  >
    {props => (
      <Form>
        <Description
          description={props.values.description}
          editing={boolean('Editing', false)}
        />
      </Form>
    )}
  </Formik>
);

StorybookDescription.story = {
  name: 'Book Description',
};
