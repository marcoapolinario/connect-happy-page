import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className }: Props) => (
  <div
    className={
      "prose prose-invert max-w-none " +
      "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground " +
      "prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 " +
      "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 " +
      "prose-p:text-base prose-p:leading-relaxed prose-p:text-foreground/90 " +
      "prose-a:text-primary prose-a:no-underline hover:prose-a:underline " +
      "prose-strong:text-foreground " +
      "prose-li:my-1 prose-ul:my-4 prose-ol:my-4 " +
      "prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r " +
      "prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] " +
      "prose-img:rounded-xl " +
      (className ?? "")
    }
  >
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </div>
);
