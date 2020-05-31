import React, { useState } from 'react';
import { useMutation } from 'react-apollo';

import { FORGOT_MUTATION } from './queries';
import { ForgotSchema } from './validation';
import ForgotUI from './ui';

const ERRORS = {
  UNAUTHORIZED: 'The username or password you entered is incorrect',
  ERROR: 'Unexpected Error',
};

export default function Forgot() {
  const [forgetPassword, { loading }] = useMutation(FORGOT_MUTATION);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  function validate(form) {
    const validationErrors = ForgotSchema.validate(form);

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

  function onForgotError(error) {
    setErrors({ form: ERRORS[error.graphQLErrors[0].message] });
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries()); // todo: fix, add rememberme to backend - extend refresh token length

    if (validate(formValues)) {
      forgetPassword({ variables: { email: formValues.email } })
        .then(result => {
          if (result.data.forgot) {
            setSuccess(true);
          }

          setErrors({ form: 'Something went wrong, please try again.' });
        })
        .catch(onForgotError);
    }
  }

  return (
    <ForgotUI
      onSubmit={onSubmit}
      loading={loading}
      errors={errors}
      success={success}
    />
  );
}
