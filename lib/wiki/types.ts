import type { CategoryId } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import type {
  ArticleConceptLink,
  ArticleCoverImage,
  ArticleDifficulty,
  ArticleReference,
  ArticleSchool,
  ArticleStatus,
  ArticleSourceStatus,
} from '@/types/article';
import type { SeriesItem } from '@/types/series';

export type WikiArticleStatus = ArticleStatus;

export interface WikiLink {
  label: string;
  slug: string;
  kind?: 'article' | 'concept';
}

export interface WikiArticleMeta {
  schemaVersion: 3;
  id: string;
  publicId: string;
  ownerId: string;
  authorName: string;
  title: string;
  subtitle: string;
  slug: string;
  locale: Locale;
  excerpt: string;
  category: CategoryId | '';
  school: ArticleSchool | '';
  difficulty: ArticleDifficulty | '';
  sourceStatus?: ArticleSourceStatus;
  coverImage: ArticleCoverImage | null;
  tags: string[];
  aliases: string[];
  outgoingLinks: WikiLink[];
  relatedConcepts: ArticleConceptLink[];
  relatedArticles: string[];
  references: ArticleReference[];
  seriesId?: string;
  postType?: 'article' | 'concept' | 'series';
  // Concept metadata
  originalTerm?: string;
  thaiTerm?: string;
  shortDefinition?: string;
  tradition?: string;
  thinkers?: string[];
  commonMisunderstandings?: string[];
  examples?: string[];
  entryType?: string;
  // Series metadata
  items?: SeriesItem[];
  seoTitle: string;
  seoDescription: string;
  translations: Partial<Record<Locale, string>>;
  featured: boolean;
  status: WikiArticleStatus;
  markdownKey: string;
  contentHash: string;
  publishedContentHash: string | null;
  publishedSlug: string | null;
  readingMinutes: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface WikiArticle extends WikiArticleMeta {
  content: string;
}

export interface PublishedArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: CategoryId;
  school: ArticleSchool;
  difficulty: ArticleDifficulty;
  sourceStatus?: ArticleSourceStatus;
  locale: Locale;
  coverImage: ArticleCoverImage | null;
  tags: string[];
  aliases: string[];
  outgoingLinks: WikiLink[];
  relatedConcepts: ArticleConceptLink[];
  relatedArticles: string[];
  references: ArticleReference[];
  seriesId?: string;
  postType?: 'article' | 'concept' | 'series';
  // Concept metadata
  originalTerm?: string;
  thaiTerm?: string;
  shortDefinition?: string;
  tradition?: string;
  thinkers?: string[];
  commonMisunderstandings?: string[];
  examples?: string[];
  entryType?: string;
  // Series metadata
  items?: SeriesItem[];
  seoTitle: string;
  seoDescription: string;
  translations: Partial<Record<Locale, string>>;
  featured: boolean;
  authorName: string;
  markdownKey: string;
  contentHash: string;
  readingMinutes: number;
  publishedAt: string;
  updatedAt: string;
}
