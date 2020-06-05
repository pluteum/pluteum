import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import PropTypes from 'prop-types';

import queryString from 'query-string';

import ResetPasswordUI from './ui';
import { RESET_PASSWORD_MUTATION } from './queries';
import { ResetSchema } from './validation';

const ERRORS = {
  UNAUTHORIZED: 'The username or password you entered is incorrect',
  ERROR: 'Unexpected Error',
};

export default function ResetPassword({ setJWT, history, location }) {
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION);
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(undefined);

  useEffect(() => setToken(queryString.parse(location.search).token), []);

  function validate(form) {
    const validationErrors = ResetSchema.validate(form);

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

    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords must match' });

      return false;
    }

    return true;
  }

  function loginToken({ data }) {
    if (data && data.reset.token) {
      setJWT(data.reset.token);
      history.push('/');
    } else {
      setErrors({ form: ERRORS.ERROR });
    }
  }

  function onResetError(error) {
    setErrors({
      form:
        ERRORS[error.graphQLErrors[0].message] ||
        error.graphQLErrors[0].message,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    if (validate(formValues)) {
      resetPassword({
        variables: { input: { password: formValues.password, token } },
      })
        .then(loginToken)
        .catch(onResetError);
    }
  }

  return (
    <ResetPasswordUI onSubmit={onSubmit} errors={errors} loading={loading} />
  );
}

ResetPassword.propTypes = {
  setJWT: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
};
