import { useMutation } from '@apollo/react-hooks';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';
import Button from 'components/form/Button';
import Checkbox from 'components/form/input/Checkbox';
import TextInput from 'components/form/input/Text';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Schema from 'validate';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// TODO: DEFINE STANDARD ERROR MESSAGES FOR ALL MICROSERVICES AND STANDARD USER FACING ERROR MESSAGES
const LoginInput = new Schema({
  email: {
    type: String,
    required: true,
    match: EMAIL_REGEX,
    message: { match: 'Please enter a valid email' },
  },
  password: {
    type: String,
    required: true,
    length: { min: 4 },
  },
});

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #f7f8fa;
`;

const Box = styled.div`
  max-width: 560px;
  padding: 70px 80px 50px;
  background: #ffffff;
  margin: 0 auto;
  position: relative;
  top: 50px;

  form {
    margin: 80px 0 50px;

    > h1,
    > div {
      margin: 25px 0;
    }
  }

  > p {
    margin-top: 70px;
    padding: 25px 0 0;
    font-family: ${props => props.theme.type.sans_serif};
    color: ${props => props.theme.colors.darkGrey};
    border-top: ${props => props.theme.colors.lightGrey} 1px solid;
    font-size: 12px;
  }

  .spinner {
    color: ${props => props.theme.colors.white};
    font-size: 16px;
    animation: ${spin} 2s linear infinite;
  }

  @media (max-width: 425px) {
    height: 100%;
    top: 0;
    padding: 40px;

    form {
      margin: 40px 0;
    }
  }
`;

// does not belong in here
const StyledError = styled.span`
  display: inline-block;
  float: right;
  margin: 5px 0 0;
  padding: 10px 25px;
  line-height: 22px;
  font-family: ${props => props.theme.type.sans_serif};
  color: ${props => props.theme.colors.red};
  font-size: 12px;
  line-height: 14px;
`;

const MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

const ERRORS = {
  UNAUTHORIZED: 'The username or password you entered is incorrect',
  ERROR: 'Unexpected Error',
};

export default function Login({ setJWT, history }) {
  const [login, { loading }] = useMutation(MUTATION);
  const [errors, setErrors] = useState({});

  function validate(form) {
    const validationErrors = LoginInput.validate(form);

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

  function onLoginError(error) {
    setErrors({ form: ERRORS[error.graphQLErrors[0].message] });
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { rememberme, ...input } = Object.fromEntries(formData.entries()); // todo: fix, add rememberme to backend - extend refresh token length

    if (validate(input)) {
      login({ variables: { input } })
        .then(loginToken)
        .catch(onLoginError);
    }
  }

  return (
    <Layout>
      <Box>
        <Logo />
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
