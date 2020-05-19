import Schema from 'validate';

export const ResetSchema = new Schema({
  password: {
    type: String,
    required: true,
    length: { min: 4 },
  },
  confirmPassword: {
    type: String,
    required: true,
    length: { min: 4 },
  },
});
