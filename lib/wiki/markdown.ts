import type { WikiLink } from './types';

const wikiLinkPattern = /\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g;

function parseWikiTarget(value: string) {
  const trimmed = value.trim();
  const match = /^(article|concept):(.+)$/i.exec(trimmed);
  const kind = match?.[1].toLowerCase() === 'concept' ? 'concept' : 'article';
  const target = match?.[2]?.trim() || trimmed;

  return {
    kind,
    target,
    slug: slugifyWikiValue(target),
  } as const;
}

export function slugifyWikiValue(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180);
}

export function extractWikiLinks(content: string): WikiLink[] {
  const links = new Map<string, WikiLink>();

  for (const match of content.matchAll(wikiLinkPattern)) {
    const { kind, target, slug } = parseWikiTarget(match[1]);

    if (!slug) continue;

    links.set(`${kind}:${slug}`, {
      slug,
      label: (match[2] || target).trim(),
      kind,
    });
  }

  return Array.from(links.values());
}

export function renderObsidianLinks(content: string, locale: string): string {
  return content.replace(
    wikiLinkPattern,
    (_match, rawTarget: string, customLabel?: string) => {
      const { kind, target, slug } = parseWikiTarget(rawTarget);
      const label = (customLabel || target).trim();
      const collection = kind === 'concept' ? 'concepts' : 'articles';
      return slug ? `[${label}](/${locale}/${collection}/${slug})` : label;
    }
  );
}

export function parseCommaSeparated(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  ).slice(0, 30);
}
