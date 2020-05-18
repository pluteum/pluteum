import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import PropTypes from 'prop-types';

import { LoginSchema } from './validation';
import { LOGIN_MUTATION } from './queries';
import LoginUI from './ui';

const ERRORS = {
  UNAUTHORIZED: 'The username or password you entered is incorrect',
  ERROR: 'Unexpected Error',
};

export default function Login({ setJWT, history }) {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const [errors, setErrors] = useState({});

  function validate(form) {
    const validationErrors = LoginSchema.validate(form);

    if (validationErrors.length) {
      setErrors(
        validationErrors.reduce((map, error) => {
          // eslint-disable-next-line no-param-reassign
          map[error.path] = error.message;
          return map;
        }, {}),
      );

      return false;
    }

    return true;
  }

  function loginToken({ data }) {
    if (data && data.login.token) {
      setJWT(data.login.token);
      history.push('/');
    } else {
      setErrors({ form: ERRORS.ERROR });
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { rememberme, ...input } = Object.fromEntries(formData.entries()); // todo: fix, add rememberme to backend - extend refresh token length

    if (validate(input)) {
      login({ variables: { input } })
        .then(loginToken)
        .catch(error => {
          if (error && error.graphQLErrors) {
            setErrors({
              form:
                ERRORS[error.graphQLErrors[0].message] ||
                error.graphQLErrors[0].message,
            });
          } else {
            setErrors({ form: ERRORS.ERROR });
          }
        });
    }
  }

  return <LoginUI onSubmit={onSubmit} loading={loading} errors={errors} />;
}

Login.propTypes = {
  setJWT: PropTypes.func,
  history: PropTypes.object,
};
