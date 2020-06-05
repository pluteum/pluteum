import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',

  brandTitle: "Pluteum's Storybook",
  brandUrl: 'https://pluteum.io',
  brandImage: 'https://pluteum.io/assets/img/pluteum.svg',
});

addons.setConfig({
  theme: theme,
});
