/*
 * Setting Messages
 *
 * This contains all the text for the Setting container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Settings';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Settings container!',
  },
});
