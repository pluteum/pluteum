const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
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
