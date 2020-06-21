const path = require('path');

module.exports = {
  stories: ['../app/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    'storybook-addon-designs',
    '@storybook/addon-viewport/register',
    {
      name: '@storybook/preset-typescript',
      options: {
        forkTsCheckerWebpackPluginOptions: {
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
        },
      },
    },
  ],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};
