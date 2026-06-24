'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  archiveStudioArticle,
  publishStudioArticle,
  removeStudioCover,
  saveStudioArticle,
  unpublishStudioArticle,
  uploadStudioCover,
} from '@/app/[locale]/studio/actions';
import { SoulIcon, type SoulIconName } from '@/components/icons/SoulIcon';
import { MarkdownContent } from '@/components/wiki/MarkdownContent';
import { categories, type CategoryId } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import {
  categorySchools,
  formatConceptLinks,
  formatReferences,
} from '@/lib/wiki/article-metadata';
import { slugifyWikiValue } from '@/lib/wiki/markdown';
import type {
  PublishRequirementKey,
  StudioActionResult,
  StudioArticleInput,
} from '@/lib/wiki/studio-types';
import type { WikiArticle, WikiArticleStatus } from '@/lib/wiki/types';
import {
  articleDifficulties,
  articleSchools,
  articleSourceStatuses,
  type Article,
  type ArticleSourceStatus,
  type ArticleSchool,
  type ArticleDifficulty,
} from '@/types/article';
import {
  categoryMetadata,
  readingLevelMetadata,
  sourceStatusMetadata,
} from '@/lib/content/metadata-mapping';
import { ArticleMetadataPanel } from '@/components/ui/ArticleMetadata';
import { ArticleCard } from '@/components/articles/ArticleCard';

type SaveState =
  | 'unsaved'
  | 'saving'
  | 'saved'
  | 'error'
  | 'uploading'
  | 'uploaded'
  | 'publishing';

interface BacklinkSummary {
  id: string;
  title: string;
}

interface ArticleStudioEditorProps {
  article: WikiArticle | null;
  backlinks: BacklinkSummary[];
  locale: Locale;
}

const requirementLabels: Record<PublishRequirementKey, string> = {
  title: 'ชื่อบทความ',
  content: 'เนื้อหา',
  slug: 'Slug',
  excerpt: 'คำโปรย',
  category: 'หมวดหมู่',
  difficulty: 'ระดับความลึก',
  coverImage: 'ภาพปก',
  coverAlt: 'คำอธิบายภาพปก',
};

const requirementFieldIds: Record<PublishRequirementKey, string> = {
  title: 'studio-title',
  content: 'studio-content',
  slug: 'studio-slug',
  excerpt: 'studio-excerpt',
  category: 'studio-category',
  difficulty: 'studio-difficulty',
  coverImage: 'studio-cover-input',
  coverAlt: 'studio-cover-alt',
};

const statusLabels: Record<WikiArticleStatus, string> = {
  draft: 'ฉบับร่าง',
  review: 'รอตรวจทาน',
  published: 'เผยแพร่แล้ว',
  archived: 'เก็บถาวร',
};

const inputClassName =
  'min-h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-text placeholder:text-faint focus:border-accent';
const textareaClassName =
  'w-full resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-7 text-text placeholder:text-faint focus:border-accent';
const labelClassName = 'mb-2 block text-sm font-medium text-text';

function initialInput(article: WikiArticle | null): StudioArticleInput {
  return {
    title: article?.title || '',
    subtitle: article?.subtitle || '',
    content: article?.content || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    category: article?.category || '',
    school: article?.school || '',
    difficulty: article?.difficulty || '',
    tags: article?.tags.join(', ') || '',
    aliases: article?.aliases.join(', ') || '',
    relatedConcepts: article
      ? formatConceptLinks(article.relatedConcepts)
      : '',
    relatedArticles: article?.relatedArticles.join(', ') || '',
    references: article ? formatReferences(article.references) : '',
    seriesId: article?.seriesId || '',
    seoTitle: article?.seoTitle || '',
    seoDescription: article?.seoDescription || '',
    translationTh: article?.translations.th || '',
    translationEn: article?.translations.en || '',
    coverImageUrl: article?.coverImage?.src || '',
    coverImagePath: article?.coverImage?.path || '',
    coverImageAlt: article?.coverImage?.alt || '',
    coverImageWidth: article?.coverImage
      ? String(article.coverImage.width)
      : '1600',
    coverImageHeight: article?.coverImage
      ? String(article.coverImage.height)
      : '900',
    featured: article?.featured || false,
    sourceStatus: article?.sourceStatus || 'original',
  };
}

function getMissingFields(input: StudioArticleInput): PublishRequirementKey[] {
  const missing: PublishRequirementKey[] = [];
  if (!input.title.trim()) missing.push('title');
  if (!input.content.trim()) missing.push('content');
  if (!input.slug.trim()) missing.push('slug');
  if (!input.excerpt.trim()) missing.push('excerpt');
  if (!input.category) missing.push('category');
  if (!input.difficulty) missing.push('difficulty');
  if (!input.coverImageUrl) missing.push('coverImage');
  if (!input.coverImageAlt.trim()) missing.push('coverAlt');
  return missing;
}

function countWords(content: string) {
  const spacedWords = content.trim().split(/\s+/).filter(Boolean).length;
  const thaiCharacters = (content.match(/[\u0E00-\u0E7F]/g) || []).length;
  return Math.max(spacedWords, Math.ceil(thaiCharacters / 5));
}

function FieldFeedback({
  id,
  error,
  ready,
}: {
  id: string;
  error?: string;
  ready?: string;
}) {
  if (!error && !ready) return null;

  return (
    <p
      id={id}
      className={`mt-2 flex items-center gap-2 text-sm ${
        error ? 'text-clay' : 'text-celadon'
      }`}
    >
      <SoulIcon name={error ? 'error' : 'saved'} size={15} />
      {error || ready}
    </p>
  );
}

function StatusLabel({
  icon,
  children,
  tone = 'muted',
}: {
  icon: SoulIconName;
  children: React.ReactNode;
  tone?: 'muted' | 'success' | 'error' | 'accent';
}) {
  const tones = {
    muted: 'text-muted',
    success: 'text-celadon',
    error: 'text-clay',
    accent: 'text-accent',
  };

  return (
    <span className={`inline-flex items-center gap-2 text-sm ${tones[tone]}`}>
      <SoulIcon
        name={icon}
        size={16}
        className={icon === 'saving' ? 'animate-spin motion-reduce:animate-none' : ''}
      />
      {children}
    </span>
  );
}

async function imageDimensions(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const image = new window.Image();
    image.src = url;
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function ArticleStudioEditor({
  article,
  backlinks,
  locale,
}: ArticleStudioEditorProps) {
  const router = useRouter();
  const initial = useMemo(() => initialInput(article), [article]);
  const [form, setForm] = useState(initial);
  const formRef = useRef(form);
  const [articleId, setArticleId] = useState(article?.id || null);
  const articleIdRef = useRef(article?.id || null);
  const [articleStatus, setArticleStatus] = useState<WikiArticleStatus>(
    article?.status || 'draft'
  );
  const [saveState, setSaveState] = useState<SaveState>(
    article ? 'saved' : 'unsaved'
  );
  const [savedAt, setSavedAt] = useState(article?.updatedAt || null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [publishMissing, setPublishMissing] = useState<
    PublishRequirementKey[]
  >([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorKind, setErrorKind] =
    useState<StudioActionResult['errorKind']>();
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const savingRef = useRef(false);
  const lastSavedRef = useRef(JSON.stringify(initial));
  const backupKey = `soul-studio:${article?.id || 'new'}:${locale}`;
  const [localBackupAvailable, setLocalBackupAvailable] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem(backupKey);
    return Boolean(stored && stored !== JSON.stringify(initial));
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (saveState === 'unsaved') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveState]);

  const updateField = useCallback(
    <Key extends keyof StudioArticleInput>(
      key: Key,
      value: StudioArticleInput[Key]
    ) => {
      setForm((current) => {
        const next = { ...current, [key]: value };
        formRef.current = next;
        return next;
      });
      setSaveState('unsaved');
      setPublishMissing([]);
      setErrorMessage('');
      setFieldErrors((current) => {
        if (!current[key]) return current;
        const next = { ...current };
        delete next[key];
        return next;
      });
    },
    []
  );

  useEffect(() => {
    window.localStorage.setItem(backupKey, JSON.stringify(form));
  }, [backupKey, form]);

  const syncSuccessfulSave = useCallback(
    (
      snapshot: StudioArticleInput,
      result: Pick<
        StudioActionResult,
        'articleId' | 'slug' | 'updatedAt' | 'articleStatus'
      >
    ) => {
      const normalized =
        result.slug && !snapshot.slug
          ? { ...snapshot, slug: result.slug }
          : snapshot;

      if (result.slug && !formRef.current.slug) {
        const next = { ...formRef.current, slug: result.slug };
        formRef.current = next;
        setForm(next);
      }

      lastSavedRef.current = JSON.stringify(normalized);
      if (result.articleId) {
        const wasNew = !articleIdRef.current;
        articleIdRef.current = result.articleId;
        setArticleId(result.articleId);
        if (wasNew) {
          router.replace(`/${locale}/studio/articles/${result.articleId}`);
        }
      }
      if (result.articleStatus) setArticleStatus(result.articleStatus);
      if (result.updatedAt) setSavedAt(result.updatedAt);
      setSaveState(
        JSON.stringify(formRef.current) === lastSavedRef.current
          ? 'saved'
          : 'unsaved'
      );
      setFieldErrors({});
      setErrorMessage('');
      setErrorKind(undefined);
      window.localStorage.removeItem(backupKey);
      setLocalBackupAvailable(false);
    },
    [backupKey, locale, router]
  );

  const applyError = useCallback((result: StudioActionResult) => {
    setSaveState('error');
    setFieldErrors(result.fieldErrors || {});
    setPublishMissing(result.missingFields || []);
    setErrorMessage(result.message);
    setErrorKind(result.errorKind);
  }, []);

  const performSave = useCallback(
    async (manual: boolean) => {
      if (savingRef.current) return false;
      const snapshot = formRef.current;
      savingRef.current = true;
      setIsSaving(true);
      setSaveState('saving');

      try {
        const result = await saveStudioArticle(
          articleIdRef.current,
          locale,
          snapshot
        );
        if (result.status === 'success') {
          syncSuccessfulSave(snapshot, result);
          return true;
        }
        applyError(result);
        return false;
      } catch {
        setSaveState('error');
        setErrorKind(navigator.onLine ? 'network' : 'network');
        setErrorMessage(
          navigator.onLine
            ? 'เชื่อมต่อระบบบันทึกไม่สำเร็จ กรุณาลองอีกครั้ง'
            : 'ออฟไลน์อยู่ เนื้อหาถูกเก็บไว้ในเครื่องแล้ว'
        );
        return false;
      } finally {
        savingRef.current = false;
        setIsSaving(false);
        if (!manual && saveState === 'error') {
          setLocalBackupAvailable(true);
        }
      }
    },
    [applyError, locale, saveState, syncSuccessfulSave]
  );

  useEffect(() => {
    const serialized = JSON.stringify(form);
    if (
      serialized === lastSavedRef.current ||
      !form.title.trim() ||
      !form.content.trim() ||
      isSaving ||
      isPublishing ||
      isUploading ||
      isUnpublishing ||
      isArchiving
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      void performSave(false);
    }, 1600);
    return () => window.clearTimeout(timer);
  }, [
    form,
    isArchiving,
    isPublishing,
    isSaving,
    isUnpublishing,
    isUploading,
    performSave,
  ]);

  const missingFields = getMissingFields(form);
  const highlightedMissing = new Set([...missingFields, ...publishMissing]);
  const wordCount = countWords(form.content);
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 220));
  const anyActionPending =
    isSaving || isPublishing || isUploading || isUnpublishing || isArchiving;

  const previewArticle = useMemo<Article>(() => {
    return {
      id: articleId || 'preview',
      slug: form.slug || 'slug-preview',
      title: form.title || (locale === 'th' ? 'ชื่อบทความตัวอย่าง' : 'Draft Article Title'),
      subtitle: form.subtitle || '',
      excerpt: form.excerpt || '',
      body: form.content || '',
      language: locale,
      status: articleStatus,
      category: (form.category as CategoryId) || 'analytical-psychology',
      school: (form.school as ArticleSchool) || 'Analytical Psychology',
      difficulty: (form.difficulty as ArticleDifficulty) || 'beginner',
      sourceStatus: (form.sourceStatus as ArticleSourceStatus) || 'original',
      readingTime: readingMinutes,
      publishedAt: article?.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: article?.authorName || (locale === 'th' ? 'กองบรรณาธิการ' : 'Editorial Team'),
      coverImage: form.coverImageUrl ? {
        src: form.coverImageUrl,
        path: form.coverImagePath,
        alt: form.coverImageAlt,
        width: parseInt(form.coverImageWidth) || 1600,
        height: parseInt(form.coverImageHeight) || 900,
      } : null,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      relatedConcepts: [],
      relatedArticles: [],
      references: [],
      seriesId: form.seriesId || undefined,
      seoTitle: form.seoTitle || '',
      seoDescription: form.seoDescription || '',
      translations: {
        th: form.translationTh,
        en: form.translationEn,
      },
      featured: form.featured,
    };
  }, [form, articleId, articleStatus, locale, article?.publishedAt, article?.authorName, readingMinutes]);

  const status = useMemo(() => {
    if (isUploading) {
      return { icon: 'saving' as const, text: 'กำลังอัปโหลดภาพปก...', tone: 'accent' as const };
    }
    if (isPublishing) {
      return { icon: 'saving' as const, text: 'กำลังเผยแพร่...', tone: 'accent' as const };
    }
    if (saveState === 'saving') {
      return { icon: 'saving' as const, text: 'กำลังบันทึก...', tone: 'accent' as const };
    }
    if (saveState === 'error') {
      return { icon: 'error' as const, text: errorMessage || 'บันทึกไม่สำเร็จ', tone: 'error' as const };
    }
    if (saveState === 'unsaved') {
      return { icon: 'warning' as const, text: 'มีการแก้ไขที่ยังไม่บันทึก', tone: 'accent' as const };
    }
    if (saveState === 'uploaded') {
      return { icon: 'saved' as const, text: 'อัปโหลดภาพปกแล้ว', tone: 'success' as const };
    }
    if (articleStatus === 'published') {
      return { icon: 'saved' as const, text: 'เผยแพร่แล้ว', tone: 'success' as const };
    }
    return { icon: 'saved' as const, text: 'บันทึกแล้ว', tone: 'success' as const };
  }, [articleStatus, errorMessage, isPublishing, isUploading, saveState]);

  function focusFirstInvalid(fields: PublishRequirementKey[]) {
    const first = fields[0];
    if (!first) return;
    document.getElementById(requirementFieldIds[first])?.focus();
  }

  async function handlePublish() {
    const missing = getMissingFields(formRef.current);
    if (missing.length) {
      setPublishMissing(missing);
      setErrorKind('validation');
      setErrorMessage(
        `ยังเผยแพร่ไม่ได้ · ขาด ${missing
          .map((field) => requirementLabels[field])
          .join(', ')}`
      );
      focusFirstInvalid(missing);
      return;
    }

    setIsPublishing(true);
    setSaveState('publishing');
    const snapshot = formRef.current;
    try {
      const result = await publishStudioArticle(
        articleIdRef.current,
        locale,
        snapshot
      );
      if (result.status === 'success') {
        syncSuccessfulSave(snapshot, result);
        setArticleStatus('published');
        router.refresh();
      } else {
        applyError(result);
        focusFirstInvalid(result.missingFields || []);
      }
    } catch {
      setSaveState('error');
      setErrorKind('network');
      setErrorMessage('เผยแพร่ไม่สำเร็จ ฉบับร่างยังถูกเก็บไว้');
    } finally {
      setIsPublishing(false);
    }
  }

  async function handleCoverUpload(file: File) {
    setErrorMessage('');
    if (
      !['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(
        file.type
      )
    ) {
      setFieldErrors({ coverImageUrl: ['ชนิดไฟล์ภาพไม่รองรับ'] });
      setErrorKind('validation');
      setErrorMessage('ภาพปกต้องเป็น JPEG, PNG, WebP หรือ AVIF');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors({ coverImageUrl: ['ไฟล์มีขนาดใหญ่เกิน 5MB'] });
      setErrorKind('validation');
      setErrorMessage('ภาพปกต้องมีขนาดไม่เกิน 5MB');
      return;
    }

    if (!articleIdRef.current) {
      const saved = await performSave(true);
      if (!saved || !articleIdRef.current) {
        setErrorMessage('บันทึกชื่อและเนื้อหาก่อนอัปโหลดภาพปก');
        return;
      }
    }

    setIsUploading(true);
    setSaveState('uploading');
    const oldPath = formRef.current.coverImagePath;
    try {
      const dimensions = await imageDimensions(file);
      const payload = new FormData();
      payload.set('file', file);
      payload.set('width', String(dimensions.width));
      payload.set('height', String(dimensions.height));
      const result = await uploadStudioCover(
        articleIdRef.current,
        locale,
        payload
      );

      if (result.status !== 'success' || !result.coverImage) {
        applyError(result);
        return;
      }

      const next = {
        ...formRef.current,
        coverImageUrl: result.coverImage.src,
        coverImagePath: result.coverImage.path,
        coverImageWidth: String(result.coverImage.width),
        coverImageHeight: String(result.coverImage.height),
      };
      formRef.current = next;
      setForm(next);
      setSaveState('uploaded');

      if (await performSave(true)) {
        if (oldPath && oldPath !== result.coverImage.path) {
          await removeStudioCover(articleIdRef.current, locale, oldPath);
        }
      }
    } catch {
      setSaveState('error');
      setErrorKind('storage');
      setErrorMessage('อัปโหลดภาพปกไม่สำเร็จ กรุณาลองอีกครั้ง');
    } finally {
      setIsUploading(false);
    }
  }

  async function handleRemoveCover() {
    const oldPath = formRef.current.coverImagePath;
    const next = {
      ...formRef.current,
      coverImageUrl: '',
      coverImagePath: '',
      coverImageAlt: '',
    };
    formRef.current = next;
    setForm(next);
    setSaveState('unsaved');

    if (await performSave(true)) {
      if (articleIdRef.current && oldPath) {
        const result = await removeStudioCover(
          articleIdRef.current,
          locale,
          oldPath
        );
        if (result.status === 'error') applyError(result);
      }
    }
  }

  async function handleUnpublish() {
    if (!articleIdRef.current) return;
    setIsUnpublishing(true);
    const result = await unpublishStudioArticle(articleIdRef.current, locale);
    if (result.status === 'success') {
      setArticleStatus('draft');
      setSavedAt(result.updatedAt || null);
      setSaveState('saved');
      router.refresh();
    } else {
      applyError(result);
    }
    setIsUnpublishing(false);
  }

  async function handleArchive() {
    if (!articleIdRef.current) return;
    setIsArchiving(true);
    const result = await archiveStudioArticle(articleIdRef.current, locale);
    if (result.status === 'success') {
      setArticleStatus('archived');
      setSavedAt(result.updatedAt || null);
      setSaveState('saved');
      router.refresh();
    } else {
      applyError(result);
    }
    setIsArchiving(false);
  }

  function restoreLocalBackup() {
    const stored = window.localStorage.getItem(backupKey);
    if (!stored) return;
    try {
      const restored = JSON.parse(stored) as StudioArticleInput;
      formRef.current = restored;
      setForm(restored);
      setSaveState('unsaved');
      setLocalBackupAvailable(false);
    } catch {
      window.localStorage.removeItem(backupKey);
    }
  }

  const primaryError =
    Object.values(fieldErrors).flat()[0] ||
    (publishMissing.length ? errorMessage : '');

  return (
    <div className="min-h-screen pb-32">
      <div
        className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex min-h-14 max-w-[92rem] flex-wrap items-center justify-between gap-3 px-5 py-2 sm:px-8">
          <div className="flex items-center gap-4">
            <StatusLabel icon={status.icon} tone={status.tone}>
              {status.text}
            </StatusLabel>
            <span className="hidden text-sm text-faint sm:inline">
              {statusLabels[articleStatus]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {articleStatus === 'published' && form.slug ? (
              <Link
                href={`/${locale}/articles/${form.slug}`}
                target="_blank"
                className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-muted hover:text-accent"
              >
                <SoulIcon name="external" size={16} />
                เปิดบทความ
              </Link>
            ) : null}
            <Link
              href={`/${locale}/studio/articles`}
              className="inline-flex min-h-11 items-center px-3 text-sm text-muted hover:text-text"
            >
              กลับรายการ
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-[92rem] gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start">
        <div className="min-w-0 space-y-9">
          {localBackupAvailable ? (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-accent/35 bg-accent-soft px-4 py-3">
              <StatusLabel icon="revision" tone="accent">
                พบฉบับสำรองในเครื่อง
              </StatusLabel>
              <button
                type="button"
                onClick={restoreLocalBackup}
                className="min-h-11 text-sm font-semibold text-accent"
              >
                กู้คืนฉบับสำรอง
              </button>
            </div>
          ) : null}

          <section aria-labelledby="cover-heading">
            <div className="mb-4 flex items-center gap-3">
              <SoulIcon name="cover" className="text-accent" />
              <h2 id="cover-heading" className="text-lg font-semibold text-text">
                ภาพปก
              </h2>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <div className="relative aspect-[16/9] w-full bg-surface-raised">
                {form.coverImageUrl ? (
                  <Image
                    src={form.coverImageUrl}
                    alt={form.coverImageAlt || ''}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                    unoptimized={form.coverImageUrl.startsWith('/')}
                  />
                ) : (
                  <div className="grid h-full place-items-center text-muted">
                    <div className="text-center">
                      <SoulIcon name="cover" size={32} className="mx-auto" />
                      <p className="mt-3 text-sm">ยังไม่มีภาพปก</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div>
                  <label htmlFor="studio-cover-input" className={labelClassName}>
                    อัปโหลดหรือเปลี่ยนภาพ
                  </label>
                  <input
                    id="studio-cover-input"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    disabled={isUploading}
                    aria-describedby="studio-cover-feedback"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void handleCoverUpload(file);
                      event.currentTarget.value = '';
                    }}
                    className="block w-full text-sm text-muted file:mr-4 file:min-h-11 file:rounded-md file:border-0 file:bg-accent-soft file:px-4 file:font-semibold file:text-accent hover:file:bg-accent hover:file:text-accent-ink"
                  />
                  <FieldFeedback
                    id="studio-cover-feedback"
                    error={fieldErrors.coverImageUrl?.[0]}
                    ready={form.coverImageUrl ? 'ภาพปกพร้อมใช้งาน' : undefined}
                  />
                </div>
                {form.coverImageUrl ? (
                  <button
                    type="button"
                    onClick={() => void handleRemoveCover()}
                    disabled={anyActionPending}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm text-muted hover:border-clay hover:text-clay"
                  >
                    <SoulIcon name="remove" size={16} />
                    ลบภาพ
                  </button>
                ) : null}
              </div>
              <div className="border-t border-border p-4">
                <label htmlFor="studio-cover-alt" className={labelClassName}>
                  คำอธิบายภาพปก
                </label>
                <input
                  id="studio-cover-alt"
                  value={form.coverImageAlt}
                  onChange={(event) =>
                    updateField('coverImageAlt', event.target.value)
                  }
                  className={inputClassName}
                  aria-invalid={highlightedMissing.has('coverAlt')}
                  aria-describedby="studio-cover-alt-feedback"
                  placeholder="อธิบายสาระของภาพสำหรับผู้อ่านที่มองไม่เห็นภาพ"
                />
                <FieldFeedback
                  id="studio-cover-alt-feedback"
                  error={
                    fieldErrors.coverImageAlt?.[0] ||
                    (highlightedMissing.has('coverAlt')
                      ? 'กรุณาใส่คำอธิบายภาพก่อนเผยแพร่'
                      : undefined)
                  }
                  ready={form.coverImageAlt.trim() ? 'คำอธิบายภาพพร้อม' : undefined}
                />
              </div>
            </div>
          </section>

          <section className="space-y-6" aria-label="เนื้อหาบทความ">
            <div>
              <label htmlFor="studio-title" className={labelClassName}>
                ชื่อบทความ
              </label>
              <input
                id="studio-title"
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                className="w-full border-0 border-b border-border bg-transparent px-0 py-3 font-serif text-3xl leading-tight text-text placeholder:text-faint focus:border-accent focus:outline-none sm:text-4xl"
                placeholder="ชื่อบทความ"
                maxLength={160}
                aria-invalid={Boolean(fieldErrors.title)}
                aria-describedby="studio-title-feedback"
              />
              <FieldFeedback
                id="studio-title-feedback"
                error={fieldErrors.title?.[0]}
                ready={form.title.trim() ? 'ชื่อบทความพร้อม' : undefined}
              />
            </div>

            <div>
              <label htmlFor="studio-subtitle" className={labelClassName}>
                ชื่อรอง <span className="text-faint">(ไม่บังคับ)</span>
              </label>
              <input
                id="studio-subtitle"
                value={form.subtitle}
                onChange={(event) => updateField('subtitle', event.target.value)}
                className={inputClassName}
                maxLength={240}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="studio-slug" className="text-sm font-medium text-text">
                  Slug
                </label>
                <button
                  type="button"
                  onClick={() =>
                    updateField('slug', slugifyWikiValue(formRef.current.title))
                  }
                  className="min-h-11 text-sm font-medium text-accent"
                >
                  สร้างจากชื่อ
                </button>
              </div>
              <input
                id="studio-slug"
                value={form.slug}
                onChange={(event) => updateField('slug', event.target.value)}
                className={inputClassName}
                placeholder="article-slug"
                aria-invalid={Boolean(fieldErrors.slug)}
                aria-describedby="studio-slug-feedback"
              />
              <FieldFeedback
                id="studio-slug-feedback"
                error={fieldErrors.slug?.[0]}
                ready={form.slug.trim() ? 'Slug พร้อมตรวจสอบตอนบันทึก' : undefined}
              />
            </div>

            <div>
              <label htmlFor="studio-excerpt" className={labelClassName}>
                คำโปรย
              </label>
              <textarea
                id="studio-excerpt"
                rows={4}
                maxLength={500}
                value={form.excerpt}
                onChange={(event) => updateField('excerpt', event.target.value)}
                className={textareaClassName}
                aria-invalid={highlightedMissing.has('excerpt')}
                aria-describedby="studio-excerpt-feedback"
                placeholder="สรุปคำถามหรือประเด็นหลักของบทความ"
              />
              <FieldFeedback
                id="studio-excerpt-feedback"
                error={
                  fieldErrors.excerpt?.[0] ||
                  (highlightedMissing.has('excerpt')
                    ? 'กรุณาใส่คำโปรยก่อนเผยแพร่'
                    : undefined)
                }
                ready={form.excerpt.trim() ? 'คำโปรยพร้อม' : undefined}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label htmlFor="studio-content" className="text-sm font-medium text-text">
                  เนื้อหา Markdown
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview((current) => !current)}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent"
                >
                  <SoulIcon name="preview" size={16} />
                  {showPreview ? 'กลับมาเขียน' : 'ดูตัวอย่าง'}
                </button>
              </div>
              {showPreview ? (
                <div className="min-h-[34rem] rounded-md border border-border bg-background p-5 sm:p-8">
                  <div className="prose-reading">
                    <MarkdownContent content={form.content} locale={locale} />
                  </div>
                </div>
              ) : (
                <textarea
                  id="studio-content"
                  rows={24}
                  value={form.content}
                  onChange={(event) => updateField('content', event.target.value)}
                  className={`${textareaClassName} min-h-[34rem] font-mono text-[0.95rem]`}
                  aria-invalid={Boolean(fieldErrors.content)}
                  aria-describedby="studio-content-feedback"
                  placeholder="เริ่มเขียนบทความ..."
                />
              )}
              <FieldFeedback
                id="studio-content-feedback"
                error={fieldErrors.content?.[0]}
                ready={form.content.trim() ? 'เนื้อหาพร้อมบันทึก' : undefined}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-20">
          {errorMessage ? (
            <section
              className="rounded-md border border-clay/45 bg-clay/5 p-4"
              role="alert"
              aria-labelledby="studio-error-title"
            >
              <div className="flex items-start gap-3">
                <SoulIcon name="error" className="mt-0.5 shrink-0 text-clay" />
                <div>
                  <h2 id="studio-error-title" className="font-semibold text-clay">
                    {errorKind === 'auth'
                      ? 'Session หรือสิทธิ์มีปัญหา'
                      : errorKind === 'storage'
                        ? 'Storage มีปัญหา'
                        : errorKind === 'database'
                          ? 'Database มีปัญหา'
                          : errorKind === 'network'
                            ? 'การเชื่อมต่อมีปัญหา'
                            : 'ต้องตรวจสอบก่อนทำต่อ'}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-text-soft">
                    {errorMessage}
                  </p>
                  {saveState === 'error' ? (
                    <button
                      type="button"
                      onClick={() => void performSave(true)}
                      className="mt-3 min-h-11 text-sm font-semibold text-accent"
                    >
                      ลองบันทึกอีกครั้ง
                    </button>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}

          <section aria-labelledby="checklist-title">
            <div className="mb-3 flex items-center gap-3">
              <SoulIcon name="validation" className="text-accent" />
              <h2 id="checklist-title" className="font-semibold text-text">
                ความพร้อมก่อนเผยแพร่
              </h2>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {(
                Object.keys(requirementLabels) as PublishRequirementKey[]
              ).map((field) => {
                const missing = highlightedMissing.has(field);
                return (
                  <li
                    key={field}
                    className="flex min-h-11 items-center justify-between gap-3 py-2 text-sm"
                  >
                    <span className={missing ? 'text-clay' : 'text-text-soft'}>
                      {requirementLabels[field]}
                    </span>
                    <SoulIcon
                      name={missing ? 'alert' : 'saved'}
                      size={16}
                      className={missing ? 'text-clay' : 'text-celadon'}
                    />
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="metadata-title" className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border/60 pb-2">
              <SoulIcon name="metadata" className="text-accent" />
              <h2 id="metadata-title" className="font-semibold text-text">
                Metadata
              </h2>
            </div>
            
            {/* Category Custom Selector */}
            <div className="space-y-2">
              <label className={labelClassName}>
                หมวดหมู่
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(categories).map(([id, cat]) => {
                  const meta = categoryMetadata[id as keyof typeof categoryMetadata];
                  const isSelected = form.category === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        updateField('category', id);
                        if (id in categorySchools) {
                          updateField(
                            'school',
                            categorySchools[id as keyof typeof categorySchools]
                          );
                        }
                      }}
                      className={`flex items-start gap-2 rounded-lg border p-2.5 text-left transition-all duration-200 hover:border-accent/40 ${
                        isSelected
                          ? 'border-accent bg-accent-soft/30 text-accent font-medium'
                          : 'border-border bg-surface hover:bg-surface-raised text-text-soft'
                      }`}
                    >
                      <SoulIcon
                        name={meta?.icon || 'compass'}
                        size={15}
                        className={`mt-0.5 shrink-0 ${isSelected ? 'text-accent' : 'text-muted'}`}
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold leading-tight truncate">
                          {cat.name[locale]}
                        </div>
                        <div className="text-[9px] text-muted leading-tight truncate mt-0.5">
                          {meta?.description[locale]}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {highlightedMissing.has('category') && (
                <p className="mt-1 text-xs text-clay">กรุณาเลือกหมวดหมู่</p>
              )}
            </div>

            {/* Reading Level Custom Selector */}
            <div className="space-y-2">
              <label className={labelClassName}>
                ระดับความลึก
              </label>
              <div className="grid grid-cols-2 gap-2">
                {articleDifficulties.map((difficulty) => {
                  const meta = readingLevelMetadata[difficulty];
                  const isSelected = form.difficulty === difficulty;
                  return (
                    <button
                      key={difficulty}
                      type="button"
                      onClick={() => updateField('difficulty', difficulty)}
                      className={`flex items-start gap-2 rounded-lg border p-2.5 text-left transition-all duration-200 hover:border-accent/40 ${
                        isSelected
                          ? 'border-accent bg-accent-soft/30 text-accent font-medium'
                          : 'border-border bg-surface hover:bg-surface-raised text-text-soft'
                      }`}
                    >
                      <SoulIcon
                        name={meta?.icon || 'levelBeginner'}
                        size={15}
                        className={`mt-0.5 shrink-0 ${isSelected ? 'text-accent' : 'text-muted'}`}
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold leading-tight truncate">
                          {meta?.name[locale]}
                        </div>
                        <div className="text-[9px] text-muted leading-tight truncate mt-0.5">
                          {meta?.description[locale]}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {highlightedMissing.has('difficulty') && (
                <p className="mt-1 text-xs text-clay">กรุณาเลือกระดับความลึก</p>
              )}
            </div>

            {/* Source Status Custom Selector */}
            <div className="space-y-2">
              <label className={labelClassName}>
                สถานะต้นทาง
              </label>
              <div className="grid grid-cols-2 gap-2">
                {articleSourceStatuses.map((status) => {
                  const meta = sourceStatusMetadata[status];
                  const isSelected = form.sourceStatus === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => updateField('sourceStatus', status)}
                      className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all duration-200 hover:border-accent/40 ${
                        isSelected
                          ? 'border-accent bg-accent-soft/30 text-accent font-medium'
                          : 'border-border bg-surface hover:bg-surface-raised text-text-soft'
                      }`}
                    >
                      <span style={{ color: meta?.color || 'var(--accent)' }} className="shrink-0 flex items-center">
                        <SoulIcon
                          name={meta?.icon || 'statusOriginal'}
                          size={13}
                        />
                      </span>
                      <span className="text-[11px] truncate">
                        {meta?.name[locale]}
                      </span>
                    </button>
                  );
                })}
              </div>
              {form.sourceStatus && sourceStatusMetadata[form.sourceStatus as ArticleSourceStatus] && (
                <div className="rounded-md bg-surface-raised/40 p-2 text-[10px] text-muted border border-border/40 leading-relaxed">
                  <strong>คำอธิบาย:</strong> {sourceStatusMetadata[form.sourceStatus as ArticleSourceStatus].description[locale]}
                </div>
              )}
            </div>

            {/* Tags Input */}
            <div>
              <label htmlFor="studio-tags" className={labelClassName}>
                แท็ก
              </label>
              <input
                id="studio-tags"
                value={form.tags}
                onChange={(event) => updateField('tags', event.target.value)}
                className={inputClassName}
                placeholder="Jung, Shadow, Persona"
              />
            </div>

            {/* Featured Checkbox */}
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-text-soft">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField('featured', event.target.checked)
                }
                className="size-4 rounded border-border bg-background text-accent accent-[var(--accent)] focus:ring-accent"
              />
              <span>บทความแนะนำ</span>
            </label>

            {/* Live Metadata Preview */}
            <div className="border-t border-border/60 pt-6 space-y-4">
              <div className="flex items-center gap-2 text-muted">
                <SoulIcon name="preview" size={16} />
                <h3 className="text-xs font-semibold uppercase tracking-wider">
                  {locale === 'th' ? 'ตัวอย่างการแสดงผล' : 'Metadata Live Preview'}
                </h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-medium text-muted block">
                    {locale === 'th' ? 'หน้าบทความ (Header Panel)' : 'Article Header Panel'}
                  </span>
                  <div className="scale-90 origin-top-left -mr-[11%]">
                    <ArticleMetadataPanel article={previewArticle} locale={locale} />
                  </div>
                </div>
                <div className="space-y-1 border-t border-border/40 pt-4">
                  <span className="text-[10px] font-medium text-muted block">
                    {locale === 'th' ? 'หน้ารายการ (Article Card)' : 'Article Card'}
                  </span>
                  <div className="rounded-lg border border-border bg-surface-soft/20 p-4 pointer-events-none opacity-90 select-none scale-95 origin-top-left -mr-[5%]">
                    <ArticleCard article={previewArticle} locale={locale} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <details className="border-y border-border py-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 font-semibold text-text">
              <SoulIcon name="seo" className="text-accent" />
              SEO
            </summary>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="studio-seo-title" className={labelClassName}>
                  SEO title
                </label>
                <input
                  id="studio-seo-title"
                  value={form.seoTitle}
                  onChange={(event) =>
                    updateField('seoTitle', event.target.value)
                  }
                  className={inputClassName}
                  maxLength={160}
                />
              </div>
              <div>
                <label htmlFor="studio-seo-description" className={labelClassName}>
                  SEO description
                </label>
                <textarea
                  id="studio-seo-description"
                  rows={4}
                  value={form.seoDescription}
                  onChange={(event) =>
                    updateField('seoDescription', event.target.value)
                  }
                  className={textareaClassName}
                  maxLength={320}
                />
              </div>
            </div>
          </details>

          <details className="border-b border-border pb-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 font-semibold text-text">
              <SoulIcon name="source" className="text-accent" />
              อ้างอิงและความสัมพันธ์
            </summary>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="studio-references" className={labelClassName}>
                  เอกสารอ้างอิง
                </label>
                <textarea
                  id="studio-references"
                  rows={6}
                  value={form.references}
                  onChange={(event) =>
                    updateField('references', event.target.value)
                  }
                  className={textareaClassName}
                  placeholder="ผู้เขียน | ปี | ชื่อเรื่อง | สิ่งพิมพ์ | URL"
                />
              </div>
              <div>
                <label htmlFor="studio-related-concepts" className={labelClassName}>
                  แนวคิดที่เกี่ยวข้อง
                </label>
                <textarea
                  id="studio-related-concepts"
                  rows={4}
                  value={form.relatedConcepts}
                  onChange={(event) =>
                    updateField('relatedConcepts', event.target.value)
                  }
                  className={textareaClassName}
                  placeholder="slug | ชื่อที่แสดง"
                />
              </div>
              <div>
                <label htmlFor="studio-related-articles" className={labelClassName}>
                  บทความที่เกี่ยวข้อง
                </label>
                <input
                  id="studio-related-articles"
                  value={form.relatedArticles}
                  onChange={(event) =>
                    updateField('relatedArticles', event.target.value)
                  }
                  className={inputClassName}
                  placeholder="slug-one, slug-two"
                />
              </div>
              {backlinks.length ? (
                <div>
                  <p className={labelClassName}>บทความที่ลิงก์มาหน้านี้</p>
                  <ul className="space-y-2 text-sm">
                    {backlinks.map((backlink) => (
                      <li key={backlink.id}>
                        <Link
                          href={`/${locale}/studio/articles/${backlink.id}`}
                          className="text-accent hover:text-accent-strong"
                        >
                          {backlink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </details>

          <details className="border-b border-border pb-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 font-semibold text-text">
              <SoulIcon name="metadata" className="text-accent" />
              การตั้งค่าขั้นสูง
            </summary>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="studio-school" className={labelClassName}>
                  สำนัก / กรอบทฤษฎี
                </label>
                <select
                  id="studio-school"
                  value={form.school}
                  onChange={(event) => updateField('school', event.target.value)}
                  className={inputClassName}
                >
                  <option value="">เลือกสำนัก</option>
                  {articleSchools.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="studio-aliases" className={labelClassName}>
                  Aliases
                </label>
                <input
                  id="studio-aliases"
                  value={form.aliases}
                  onChange={(event) => updateField('aliases', event.target.value)}
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="studio-series" className={labelClassName}>
                  Series ID
                </label>
                <input
                  id="studio-series"
                  value={form.seriesId}
                  onChange={(event) => updateField('seriesId', event.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
          </details>

          <section aria-labelledby="revision-title">
            <div className="mb-3 flex items-center gap-3">
              <SoulIcon name="revision" className="text-accent" />
              <h2 id="revision-title" className="font-semibold text-text">
                Revision summary
              </h2>
            </div>
            <dl className="space-y-2 text-sm text-muted">
              <div className="flex justify-between gap-4">
                <dt>สถานะ</dt>
                <dd className="text-text-soft">{statusLabels[articleStatus]}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>แก้ไขล่าสุด</dt>
                <dd className="text-right text-text-soft">
                  {savedAt
                    ? new Date(savedAt).toLocaleString(
                        locale === 'th' ? 'th-TH' : 'en-US'
                      )
                    : 'ยังไม่บันทึก'}
                </dd>
              </div>
              {article?.publishedAt ? (
                <div className="flex justify-between gap-4">
                  <dt>เผยแพร่ครั้งแรก</dt>
                  <dd className="text-right text-text-soft">
                    {new Date(article.publishedAt).toLocaleDateString(
                      locale === 'th' ? 'th-TH' : 'en-US'
                    )}
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>

          {articleId ? (
            <section className="border-t border-border pt-5">
              {articleStatus === 'published' ? (
                <button
                  type="button"
                  onClick={() => void handleUnpublish()}
                  disabled={anyActionPending}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-border px-4 text-sm text-text-soft hover:border-accent hover:text-accent"
                >
                  {isUnpublishing ? 'กำลังยกเลิก...' : 'ยกเลิกการเผยแพร่'}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => void handleArchive()}
                disabled={anyActionPending}
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-border px-4 text-sm text-muted hover:border-clay hover:text-clay"
              >
                <SoulIcon name="archive" size={16} />
                {isArchiving ? 'กำลังเก็บถาวร...' : 'เก็บบทความถาวร'}
              </button>
            </section>
          ) : null}
        </aside>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/98 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[92rem] flex-wrap items-center gap-x-5 gap-y-3 px-5 sm:px-8">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <StatusLabel icon={status.icon} tone={status.tone}>
                {status.text}
              </StatusLabel>
              <span className="text-muted">
                {wordCount.toLocaleString()} คำ · {readingMinutes} นาที
              </span>
            </div>
            <p
              className={`mt-1 truncate text-sm ${
                primaryError ? 'text-clay' : 'text-muted'
              }`}
              aria-live="assertive"
            >
              {primaryError ||
                (missingFields.length
                  ? `ยังขาด: ${missingFields
                      .map((field) => requirementLabels[field])
                      .join(', ')}`
                  : 'พร้อมเผยแพร่')}
            </p>
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => setShowPreview((current) => !current)}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm text-text-soft sm:flex-none"
            >
              <SoulIcon name="preview" size={16} />
              Preview
            </button>
            <button
              type="button"
              onClick={() => void performSave(true)}
              disabled={anyActionPending}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-semibold text-text hover:border-accent sm:flex-none"
            >
              <SoulIcon name="save" size={16} />
              บันทึกร่าง
            </button>
            <button
              type="button"
              onClick={() => void handlePublish()}
              disabled={anyActionPending}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold text-accent-ink hover:bg-accent-strong disabled:opacity-55 sm:flex-none"
            >
              <SoulIcon name="publish" size={16} />
              เผยแพร่
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
