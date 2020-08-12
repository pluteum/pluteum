import React, { useState } from 'react';
import {
  withKnobs,
  object,
  number,
  array,
  boolean,
} from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';
import Tags from './Tags';
import produce from 'immer';

export default {
  title: 'Form / Input / Tags',
  component: Tags,
  decorators: [withKnobs],
};

export const StorybookTag = () => {
  const [bookTags, setBookTags] = useState(['fiction', 'alternate history']);

  function onNewTag(tag) {
    action('New Tag')(tag);
    setBookTags(
      produce(bookTags, draft => {
        draft.push(tag);
      }),
    );
  }

  function onDeleteTag(index) {
    action('Delete Tag')(index);
    setBookTags(
      produce(bookTags, draft => {
        draft.splice(index, 1);
      }),
    );
  }

  return (
    <Tags
      tags={bookTags}
      onNewTag={onNewTag}
      onDeleteTag={onDeleteTag}
      editable={boolean('Editable', true)}
    />
  );
};

StorybookTag.story = {
  name: 'Tags',
};
