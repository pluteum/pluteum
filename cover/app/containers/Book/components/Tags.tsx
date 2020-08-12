import React from 'react';
import styled, { withTheme } from 'styled-components';
import Tag from 'components/form/Tag';
import TagsInput from './TagsInput';

const TagLayout = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin: 0;
  padding: 0;
`;

const FieldHeader = styled.p`
  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.darkGrey};
  margin: 0 0 5px;
`;

function Tags({ tags = [], editable, onLoadTags, createTag, theme }) {
  return (
    <div>
      <FieldHeader>Tags</FieldHeader>
      <TagLayout>
        {!editable &&
          tags.map((t, i) => (
            <Tag text={t.name} key={i + t} editable={editable} />
          ))}

        {editable && (
          <TagsInput
            name="tags"
            onLoadTags={onLoadTags}
            createTag={createTag}
          />
        )}
      </TagLayout>
    </div>
  );
}

export default withTheme(Tags);
