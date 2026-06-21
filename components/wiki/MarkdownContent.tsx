import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderObsidianLinks } from '@/lib/wiki/markdown';

interface MarkdownContentProps {
  content: string;
  locale: string;
}

export function MarkdownContent({ content, locale }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children, ...props }) => (
          <a {...props} rel="noreferrer">
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="my-7 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border-b border-border px-3 py-2 text-text">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-border px-3 py-2">{children}</td>
        ),
        code: ({ children }) => (
          <code className="rounded bg-surface-raised px-1.5 py-0.5 text-[0.92em] text-celadon">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="my-7 overflow-x-auto rounded-lg bg-surface-raised p-4 text-sm">
            {children}
          </pre>
        ),
      }}
    >
      {renderObsidianLinks(content, locale)}
    </ReactMarkdown>
  );
}
