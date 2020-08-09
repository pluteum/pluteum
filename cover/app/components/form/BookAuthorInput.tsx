import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Tag from './Tag';
import Highlighter from 'react-highlight-words';
import { useField } from 'formik';
import IconButton from 'components/common/IconButton';
import { PlusCircle, X, CornerDownLeft } from 'react-feather';
import produce from 'immer';
import { Styles } from 'react-select';

const Layout = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin: 0;
  padding: 0;

  > button {
    margin-top: 8px;
  }
`;

const Author = styled(Tag)`
  color: ${props => props.theme.colors.black};
  border-color: ${props => props.theme.colors.lightGrey};
`;

const customStyles = (theme): Styles => ({
  container: provided => ({
    ...provided,
    height: 36,
    margin: '8px 4px 0 0',
    outline: 'none'
  }),
  control: (provided, state) => ({
    ...provided,
    minHeight: 36,
    height: 36,
    minWidth: 175,
    background: theme.colors.lightGrey,
    borderColor: state.isFocused ? theme.colors.primary : theme.colors.grey,
    fontFamily: theme.type.sans_serif,
    color: theme.colors.black,
    fontSize: 14,
    boxShadow: 'unset',
  }),
  singleValue: provided => ({
    ...provided,
    fontFamily: theme.type.sans_serif,
    color: theme.colors.black,
    fontWeight: 500,
  }),
  placeholder: provided => ({
    ...provided,
    fontFamily: theme.type.sans_serif,
  }),
  menu: provided => ({
    ...provided,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  }),
  menuList: provided => ({
    ...provided,
    fontFamily: theme.type.sans_serif,
    color: theme.colors.black,
    fontSize: 14,
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused && theme.colors.primary,
    color: state.isFocused && theme.colors.white,
  }),
});

function formatOptionLabel({ label }, { inputValue }) {
  if (typeof label == 'string' ) { 
    return (
      <Highlighter
        searchWords={[inputValue]}
        textToHighlight={label}
        highlightTag={({ children }) => <strong>{children}</strong>}
      />
    );
  }
  return label;
}

const AddNewLayout = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center; 

  > svg {
    margin-left: 5px;
  }
`;

function filterOptions({ label, value, data }, string) {
  if (typeof label == 'string' ) {
    return label?.toLowerCase().includes(string.toLowerCase());
  }

  return true;
}

function BookAuthorInput({
  onLoadAuthors,
  createAuthor,
  theme,
  name,
}) {
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [field, meta, helpers] = useField({ name });

  function onChange(value) {
    helpers.setValue([...field.value, { name: value.label } ]);
    setAdding(false);
  }

  function onBlur(e) {
    setAdding(false);
    return field.onBlur(e);
  }

  function onNewAuthor(v) {
    setLoading(true);
    setInputValue(v);

    return createAuthor(v).then((author) => {
      setLoading(false);
      setInputValue('');
      onChange({ label: author.name });
    })
  }

  function onDelete(i) {
    helpers.setValue(produce(field.value, (draft) => {
      draft.splice(i, 1)
    }));
  }

  return (
    <Layout>
      {field.value.map((author, i) => (
        <Author text={author.name} onRemove={() => onDelete(i)} editable />
      ))}
      {!adding && (
        <IconButton
          onClick={() => {
            setAdding(true);
          }}
        >
          <PlusCircle stroke={theme.colors.darkGrey} />
        </IconButton>
      )}
      {adding && <AsyncCreatableSelect
        onChange={onChange}
        onBlur={onBlur}
        filterOption={filterOptions}
        onCreateOption={onNewAuthor}
        styles={customStyles(theme)}
        formatOptionLabel={formatOptionLabel}
        formatCreateLabel={(v) => <AddNewLayout><span>Add <strong>{v}</strong></span><PlusCircle size={16} /></AddNewLayout>}
        loadOptions={onLoadAuthors}
        isLoading={loading}
        isDisabled={loading}
        placeholder={inputValue}
        autoFocus
        cacheOptions
        hideSelectedOptions
      />}
    </Layout>
  );
}

export default withTheme(BookAuthorInput);
