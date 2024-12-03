import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownBlock({
  content,
}: Readonly<{ content: string }>) {
  return (
    <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}
