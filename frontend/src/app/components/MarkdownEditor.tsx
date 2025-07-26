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
    <div className="markdown-editor-container">
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