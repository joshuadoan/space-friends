import type { Meta, StoryObj } from "@storybook/react";

import { ActorDetails } from "../components/ActorDetails";
import { ActorBase } from "../classes/Base";
import { Color } from "excalibur";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Compnents/Badge",
  component: ActorDetails,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ActorDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    meeple: new ActorBase({
      color: Color.Blue,
    }),
  },
};
