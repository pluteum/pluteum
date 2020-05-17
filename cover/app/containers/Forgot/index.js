import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';
import Button from 'components/form/Button';
import TextInput from 'components/form/input/Text';
import gql from 'graphql-tag';
import styled, { keyframes } from 'styled-components';
import Schema from 'validate';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// TODO: DEFINE STANDARD ERROR MESSAGES FOR ALL MICROSERVICES AND STANDARD USER FACING ERROR MESSAGES
const ForgotInput = new Schema({
  email: {
    type: String,
    required: true,
    match: EMAIL_REGEX,
    message: { match: 'Please enter a valid email' },
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
    margin: 80px 0 30px;

    > h1,
    > div {
      margin: 25px 0;
    }
  }

  > p {
    margin-top: 50px;
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
  mutation Forgot($email: String!) {
    forgot(email: $email)
  }
`;

const ERRORS = {
  UNAUTHORIZED: 'The username or password you entered is incorrect',
  ERROR: 'Unexpected Error',
};

export default function Forgot() {
  const [forgetPassword, { loading }] = useMutation(MUTATION);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  function validate(form) {
    const validationErrors = ForgotInput.validate(form);

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
    <Layout>
      <Box>
        <Link to="/login">
          <Logo />
        </Link>
        <form onSubmit={onSubmit}>
          <Typography type="SectionTitle">Forgot your password?</Typography>
          {success && (
            <React.Fragment>
              <Typography type="Paragraph">
                We&apos;ve sent an email with further instructions on how to
                reset your password!
              </Typography>
            </React.Fragment>
          )}
          {!success && (
            <React.Fragment>
              <TextInput
                disabled={loading}
                name="email"
                label="Email Address"
                error={errors.email}
              />
              <Button>
                {loading ? (
                  <FontAwesomeIcon className="spinner" icon={faSpinner} />
                ) : (
                  'Submit'
                )}
              </Button>
              {errors.form && <StyledError>{errors.form}</StyledError>}
            </React.Fragment>
          )}
        </form>
        <p>Developed by George Sumpster / Designed by Johnny Lee</p>
      </Box>
    </Layout>
  );
}
