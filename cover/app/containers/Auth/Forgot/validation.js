import Schema from 'validate';

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// TODO: DEFINE STANDARD ERROR MESSAGES FOR ALL MICROSERVICES AND STANDARD USER FACING ERROR MESSAGES
export const ForgotSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: EMAIL_REGEX,
    message: { match: 'Please enter a valid email' },
  },
});
