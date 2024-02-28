import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import help from "../../readme.md";

const Help = () => {
  return (
    <div className="prose text-white prose-headings:text-white overflow-auto prose-img:border prose-img:border-white prose-a:text-white p-6">
      <Markdown remarkPlugins={[remarkGfm]}>{help}</Markdown>
    </div>
  );
};
export default Help;
