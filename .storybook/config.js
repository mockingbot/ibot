import { configure, setAddon, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

function loadStories() {
  require('../stories');
}

addDecorator((story, context) => withInfo('usage')(story)(context));

configure(loadStories, module);
