import Schema from 'validate';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const LoginSchema = new Schema({
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
