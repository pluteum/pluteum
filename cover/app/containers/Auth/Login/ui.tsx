import React from 'react';

import Typography from 'components/common/Type/Typography';
import TextInput from 'components/form/input/Text';
import PropTypes from 'prop-types';
import Logo from 'components/common/Logo/Logo';
import Checkbox from 'components/form/input/Checkbox';
import Button from 'components/form/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Layout from 'containers/Auth/components/Layout';

export default function LoginUI({ onSubmit, loading, errors }) {
  return (
    <Layout>
      <Link to="/login">
        <Logo />
      </Link>
      <form aria-label="Login Form" onSubmit={onSubmit}>
        <Typography type="SectionTitle">Sign In</Typography>
        <TextInput
          disabled={loading}
          name="email"
          label="Email Address"
          type="email"
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
        <Button primary>
          {loading ? (
            <FontAwesomeIcon className="spinner" icon={faSpinner} />
          ) : (
            'Login'
          )}
        </Button>
        <Typography style={{ marginLeft: 15 }} type="TextLink" to="/forgot">
          Forgot your password?
        </Typography>
        {errors.form && <Typography type="FormError">{errors.form}</Typography>}
      </form>
      <p>Developed by George Sumpster / Designed by Johnny Lee</p>
    </Layout>
  );
}

LoginUI.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.object,
};
