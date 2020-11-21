import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Card from '../components/Card';

export default {
  title: 'Example/Card',
  component: Card,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;

const Template: Story = (args) => <Card />;

export const Main = Template.bind({});
Main.args = {};
