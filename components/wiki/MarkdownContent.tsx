import React, { Children, ReactElement, isValidElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SoulIcon } from '@/components/icons/SoulIcon';
import { markdownHeadingIcons } from '@/lib/icon-registry';
import { renderObsidianLinks } from '@/lib/wiki/markdown';
import { MarkdownCallout, type MarkdownCalloutType } from './MarkdownCallout';

interface MarkdownContentProps {
  content: string;
  locale: string;
}

const validCalloutTypes: MarkdownCalloutType[] = [
  'concept',
  'definition',
  'source',
  'quote',
  'warning',
  'caution',
  'reflection',
  'question',
  'comparison',
  'note',
  'jungian',
  'psychoanalysis',
  'philosophy',
];

function parseCallout(children: React.ReactNode): {
  type: MarkdownCalloutType;
  title?: string;
  cleanChildren: React.ReactNode;
} | null {
  const childrenArray = Children.toArray(children);
  const firstChild = childrenArray[0];

  if (!isValidElement(firstChild) || firstChild.type !== 'p') {
    return null;
  }

  const firstElement = firstChild as React.ReactElement<{ children?: React.ReactNode }>;
  const pChildren = Children.toArray(firstElement.props.children);
  const firstTextNode = pChildren[0];

  if (typeof firstTextNode !== 'string') {
    return null;
  }

  const match = /^\[!([a-zA-Z-]+)\](.*)/.exec(firstTextNode);
  if (!match) {
    return null;
  }

  const type = match[1].toLowerCase() as MarkdownCalloutType;
  if (!validCalloutTypes.includes(type)) {
    return null;
  }

  const remainingText = match[2].trim();

  // Rebuild the paragraph content without the callout header
  let cleanPChildren: React.ReactNode[];
  if (remainingText) {
    cleanPChildren = [remainingText, ...pChildren.slice(1)];
  } else {
    cleanPChildren = pChildren.slice(1);
  }

  const cleanFirstChild = React.cloneElement(firstElement, {
    children: cleanPChildren,
  });

  return {
    type,
    title: remainingText || undefined,
    cleanChildren: [cleanFirstChild, ...childrenArray.slice(1)],
  };
}

export function MarkdownContent({ content, locale }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="markdown-heading flex items-start gap-3">
            <span className="mt-[0.38em] grid size-7 shrink-0 place-items-center rounded-sm border border-accent/35 text-accent">
              <SoulIcon name={markdownHeadingIcons.h2} size={15} />
            </span>
            <span>{children}</span>
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="markdown-heading flex items-start gap-2.5">
            <SoulIcon
              name={markdownHeadingIcons.h3}
              size={15}
              className="mt-[0.45em] shrink-0 text-accent"
            />
            <span>{children}</span>
          </h3>
        ),
        blockquote: ({ children }) => {
          const parsed = parseCallout(children);
          if (parsed) {
            return (
              <MarkdownCallout
                type={parsed.type}
                title={parsed.title}
                locale={locale}
              >
                {parsed.cleanChildren}
              </MarkdownCallout>
            );
          }
          return (
            <MarkdownCallout type="quote" locale={locale}>
              {children}
            </MarkdownCallout>
          );
        },
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
