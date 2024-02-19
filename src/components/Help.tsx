import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import help from "../../readme.md";

const Help = () => {
  return (
    <div className="prose lg:prose-xl bg-white bg-opacity-80 rounded-md p-4 overflow-auto flex flex-col h-full">
      <h1 className="bold p-4 w-80">Help</h1>
      <Markdown className="" remarkPlugins={[remarkGfm]}>
        {help}
      </Markdown>
    </div>
  );
};
export default Help;
