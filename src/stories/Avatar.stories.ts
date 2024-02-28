import type { Meta, StoryObj } from "@storybook/react";
import Avater from "../components/Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Compnents/Avatar",
  component: Avater,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Avater>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMNJREFUWEdjdHo5+z8DHnDbKxGfNEE51W3z8aphHHXAgIeArPEfvGkAPQIJxSmpaYZx1AGDPgQIxTmhgoBQmiCYBkYdQPMQQC+I0OMM3QGE4pSQenR5jLpg1AF0D4HOHy4odcEU6x0oWZtQnBKqK9A9lHPUA0UL46gDBjwE0MsBd/6VKHG082M4oeIerzwh8zDKAUIaSHUNIfNGHYCRDdHjnFA+Ro8SQuUIepSMOmDgQ4DU9gCp2ZBQ5UZye2DUAdQOAQDO+RT4RL+XegAAAABJRU5ErkJggg==",
  },
};
