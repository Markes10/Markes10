import type { Meta, StoryObj } from '@storybook/react';
import Terminal from '../components/Terminal';

const meta: Meta<typeof Terminal> = {
  title: 'Portfolio/Terminal',
  component: Terminal,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Terminal>;

export const Default: Story = {};

export const AmberTheme: Story = {};

export const GreenTheme: Story = {};

export const MatrixTheme: Story = {};
