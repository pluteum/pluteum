import React from 'react';
import PropTypes from 'prop-types';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from 'components/common/Logo/Logo';
import Typography from 'components/common/Type/Typography';
import Button from 'components/form/Button';
import TextInput from 'components/form/input/Text';
import { Link } from 'react-router-dom';
import { Layout, Box } from './styles';

export default function ForgotUI({ onSubmit, loading, errors, success }) {
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
              {errors.form && (
                <Typography type="FormError">{errors.form}</Typography>
              )}
            </React.Fragment>
          )}
        </form>
        <p>Developed by George Sumpster / Designed by Johnny Lee</p>
      </Box>
    </Layout>
  );
}

ForgotUI.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  success: PropTypes.bool,
};
