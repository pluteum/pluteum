import React from 'react';
import PropTypes from 'prop-types';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';
import Button from 'components/form/Button';
import TextInput from 'components/form/input/Text';
import { Link } from 'react-router-dom';

import Layout from 'containers/Auth/components/Layout';

export default function ResetPasswordUI({ onSubmit, errors, loading }) {
  return (
    <Layout>
      <Link to="/login">
        <Logo />
      </Link>
      <form onSubmit={onSubmit}>
        <Typography type="SectionTitle">Reset your password</Typography>
        <TextInput
          disabled={loading}
          name="password"
          label="Password"
          type="password"
          error={errors.password}
        />
        <TextInput
          disabled={loading}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword}
        />
        <Button disabled={loading}>
          {loading ? (
            <FontAwesomeIcon className="spinner" icon={faSpinner} />
          ) : (
            'Submit'
          )}
        </Button>
        {errors.form && <Typography type="FormError">{errors.form}</Typography>}
      </form>
      <p>Developed by George Sumpster / Designed by Johnny Lee</p>
    </Layout>
  );
}

ResetPasswordUI.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.object,
};
