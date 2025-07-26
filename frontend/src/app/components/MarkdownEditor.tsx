"use client";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export const MarkdownEditor = ({label, defaultValue, onChange}: {label?: string, defaultValue?: string, onChange?: any}) => {
  const [value, setValue] = useState<string>(defaultValue || "");
  const handleChange = (value?: string) => {
    if (value) {
      setValue(value);
      onChange(value);
    }
  }
  return (
    <div className="markdown-editor-container [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4">
      {label && <label>{label}</label>}
      <MDEditor
        value={value}
        onChange={handleChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  )
}