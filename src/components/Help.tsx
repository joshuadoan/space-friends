import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import help from "../../readme.md";

const Help = () => {
  return (
    <div className="prose lg:prose-base prose-pink  rounded-md p-4 overflow-auto flex flex-col h-full bg-white bg-opacity-90">
      <h1>Readme</h1>
      <Markdown remarkPlugins={[remarkGfm]}>{help}</Markdown>
    </div>
  );
};
export default Help;
