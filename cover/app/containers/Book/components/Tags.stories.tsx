import React, { useState } from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';
import Tags from './Tags';
import faker from 'faker';
import { Formik, Form } from 'formik';

export default {
  title: 'Form / Input / Tags',
  component: Tags,
  decorators: [withKnobs],
};

const tags = [];

for (let i = 0; i < 100; i++) {
  tags.push({
    value: faker.random.number(),
    label: faker.name.jobArea(),
  });
}

export const StorybookTag = () => {
  function onNewTag(tag) {
    action('New Tag')(tag);
  }

  function onLoadTags() {
    action('onLoadTags')();
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(tags), 250),
    );
  }

  return (
    <Formik
      initialValues={{
        tags: [{ id: 0, name: 'Internet' }],
      }}
      onSubmit={action('onSubmit')}
    >
      {props => (
        <Form>
          <Tags
            tags={props.values.tags}
            createTag={onNewTag}
            onLoadTags={onLoadTags}
            editable={boolean('Editable', true)}
          />
        </Form>
      )}
    </Formik>
  );
};

StorybookTag.story = {
  name: 'Tags',
};
