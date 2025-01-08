import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownPageProps {
  filePath: string;
}

export default function MarkdownPage({ filePath }: MarkdownPageProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading markdown:", error));
  }, [filePath]);

  return (
    <div className="markdown-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
