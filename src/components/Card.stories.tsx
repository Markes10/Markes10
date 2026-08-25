import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import { Button } from './ui/button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Portfolio Terminal</CardTitle>
        <CardDescription>
          A retro-style interactive terminal portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Type 'help' to explore available commands.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  ),
};
