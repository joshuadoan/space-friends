import { withRouter } from "storybook-addon-react-router-v6";
import type { Preview } from "@storybook/react";
import React from "react";

import "../src/style.css"; // replace with the name of your tailwind css file

const preview: Preview = {
  decorators: [withRouter, (story) => <div className=" bg-black text-white p-4">{story()}</div>],
  parameters: {
    reactRouter: {
      location: {
        pathParams: {},
        searchParams: { actors: "" },
      },
      routing: {
        path: "/?actor=space-trader",
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
