import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';
import Button from 'components/form/Button';
import Checkbox from 'components/form/input/Checkbox';
import TextInput from 'components/form/input/Text';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LoginSchema } from './validation';
import { Layout, Box, StyledError } from './styles';
import { loginMutation } from './queries';

const ERRORS = {
  UNAUTHORIZED: 'The username or password you entered is incorrect',
  ERROR: 'Unexpected Error',
};

export default function Login({ setJWT, history }) {
  const [login, { loading }] = useMutation(loginMutation);
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
        .catch(error =>
          setErrors({
            form:
              ERRORS[error.graphQLErrors[0].message] ||
              error.graphQLErrors[0].message,
          }),
        );
    }
  }

  return (
    <Layout>
      <Box>
        <Link to="/login">
          <Logo />
        </Link>
        <form onSubmit={onSubmit}>
          <Typography type="SectionTitle">Sign In</Typography>
          <TextInput
            disabled={loading}
            name="email"
            label="Email Address"
            error={errors.email}
          />
          <TextInput
            disabled={loading}
            name="password"
            label="Password"
            type="password"
            error={errors.password}
          />
          <Checkbox disabled={loading} name="rememberme" label="Remember Me" />
          <Button>
            {loading ? (
              <FontAwesomeIcon className="spinner" icon={faSpinner} />
            ) : (
              'Login'
            )}
          </Button>
          <Typography style={{ marginLeft: 15 }} type="TextLink" to="/forgot">
            Forgot your password?
          </Typography>
          {errors.form && <StyledError>{errors.form}</StyledError>}
        </form>
        <p>Developed by George Sumpster / Designed by Johnny Lee</p>
      </Box>
    </Layout>
  );
}

Login.propTypes = {
  setJWT: PropTypes.func,
  history: PropTypes.object,
};
