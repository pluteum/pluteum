import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import { PlusCircle, CornerDownRight, X } from 'react-feather';
import IconButton from 'components/common/IconButton';

const TagLayout = styled.ul`
  display: flex;
  align-items: center;

  margin: 0;
  padding: 0;
`;

const Tag: any = styled.li`
  position: relative;
  list-style: none;

  display: inline-flex;
  align-items: center;

  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  color: ${props => props.theme.colors.darkGrey};

  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 500;
  font-size: 14px;

  padding: 8px ${(props: any) => (props.editing ? '28px' : '16px')} 8px 16px;
  margin: 0 4px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  > button {
    position: absolute;
    right: 8px;
    top: 52%;

    width: 14px;
    height: 14px;

    padding: 0;

    transform: translateY(-50%);

    border: 0;
    background: none;

    outline: none;

    cursor: pointer;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.primary};
    }
`;

const TagInputLayout = styled.span`
  position: relative;

  > button {
    position: absolute;
    right: 12px;
    top: 50%;

    width: 14px;
    height: 14px;

    padding: 0;

    transform: translateY(-50%);

    border: 0;
    background: none;

    outline: none;

    cursor: pointer;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const TagInput = styled.input`
  display: inline-block;
  width: 80px;

  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  color: ${props => props.theme.colors.darkGrey};

  font-family: ${props => props.theme.type.sans_serif};
  font-weight: 500;
  font-size: 14px;

  padding: 8px 16px 8px 16px;
  margin: 0 4px;

  outline: none;

  &:hover,
  &:focus {
    border-width: 1px;
    border-color: ${props => props.theme.colors.primary};
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

function Tags({ tags, editable, onNewTag, onDeleteTag, theme }) {
  const [inputRef, setInputRef] = useState(undefined);
  const [adding, setAdding] = useState(false);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    inputRef && inputRef.focus();
  }, [inputRef]);

  function addTag(e: any) {
    if (newTag === '') {
      return;
    }

    if (e.nativeEvent instanceof KeyboardEvent && e.key === 'Enter') {
      setAdding(false);
      return onNewTag(newTag);
    } else if (e.nativeEvent instanceof MouseEvent) {
      setAdding(false);
      return onNewTag(newTag);
    }
  }

  return (
    <TagLayout>
      {tags.map((t, i) => (
        <Tag editing={editable} key={i + t}>
          {t}
          {editable && (
            <button onClick={() => onDeleteTag(i)}>
              <X size={14} />
            </button>
          )}
        </Tag>
      ))}
      {editable && adding && (
        <TagInputLayout>
          <TagInput
            ref={input => setInputRef(input)}
            onInput={(e: any) => setNewTag(e.target.value)}
            onKeyDown={addTag}
          />
          <button onClick={addTag}>
            <CornerDownRight size={14} />
          </button>
        </TagInputLayout>
      )}
      {editable && !adding && (
        <IconButton onClick={() => setAdding(true)}>
          <PlusCircle stroke={theme.colors.darkGrey} />
        </IconButton>
      )}
    </TagLayout>
  );
}

export default withTheme(Tags);
