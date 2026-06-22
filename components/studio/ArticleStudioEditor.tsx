'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import {
  deleteStudioArticle,
  publishStudioArticle,
  saveStudioArticle,
  unpublishStudioArticle,
} from '@/app/[locale]/studio/actions';
import { MarkdownContent } from '@/components/wiki/MarkdownContent';
import { categories } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import {
  formatConceptLinks,
  formatReferences,
} from '@/lib/wiki/article-metadata';
import { slugifyWikiValue } from '@/lib/wiki/markdown';
import type {
  PublishRequirementKey,
  StudioArticleInput,
} from '@/lib/wiki/studio-types';
import type { WikiArticle, WikiArticleStatus } from '@/lib/wiki/types';
import { articleDifficulties, articleSchools } from '@/types/article';

type StudioTab = 'write' | 'organize' | 'references' | 'seo' | 'publish';
type SaveState = 'unsaved' | 'saving' | 'saved' | 'error';

interface BacklinkSummary {
  id: string;
  title: string;
}

interface ArticleStudioEditorProps {
  article: WikiArticle | null;
  backlinks: BacklinkSummary[];
  locale: Locale;
}

const tabs: Array<{ id: StudioTab; label: string }> = [
  { id: 'write', label: 'เขียน' },
  { id: 'organize', label: 'จัดระเบียบ' },
  { id: 'references', label: 'อ้างอิง' },
  { id: 'seo', label: 'SEO' },
  { id: 'publish', label: 'เผยแพร่' },
];

const requirementLabels: Record<PublishRequirementKey, string> = {
  title: 'ชื่อบทความ',
  content: 'เนื้อหา',
  slug: 'slug',
  excerpt: 'คำโปรย',
  category: 'หมวดหมู่',
  seoDescription: 'SEO description',
};

const statusLabels: Record<WikiArticleStatus, string> = {
  draft: 'ฉบับร่าง',
  review: 'รอตรวจทาน',
  published: 'เผยแพร่แล้ว',
  archived: 'เก็บถาวร',
};

const inputClassName =
  'min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text placeholder:text-faint focus:border-accent';
const textareaClassName =
  'w-full resize-y rounded-lg border border-border bg-background px-3 py-3 text-sm leading-7 text-text placeholder:text-faint focus:border-accent';
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
    coverImageAlt: article?.coverImage?.alt || '',
    coverImageWidth: article?.coverImage
      ? String(article.coverImage.width)
      : '1600',
    coverImageHeight: article?.coverImage
      ? String(article.coverImage.height)
      : '900',
    featured: article?.featured || false,
  };
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
    />
  );
}

function getMissingFields(input: StudioArticleInput): PublishRequirementKey[] {
  const missing: PublishRequirementKey[] = [];

  if (!input.title.trim()) missing.push('title');
  if (!input.content.trim()) missing.push('content');
  if (!input.slug.trim()) missing.push('slug');
  if (!input.excerpt.trim()) missing.push('excerpt');
  if (!input.category) missing.push('category');
  if (!input.seoDescription.trim()) missing.push('seoDescription');

  return missing;
}

export function ArticleStudioEditor({
  article,
  backlinks,
  locale,
}: ArticleStudioEditorProps) {
  const router = useRouter();
  const initial = useMemo(() => initialInput(article), [article]);
  const [form, setForm] = useState<StudioArticleInput>(initial);
  const formRef = useRef(form);
  const [activeTab, setActiveTab] = useState<StudioTab>('write');
  const [showPreview, setShowPreview] = useState(false);
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
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const savingRef = useRef(false);
  const lastSavedRef = useRef(JSON.stringify(initial));
  const referencesRef = useRef<HTMLTextAreaElement>(null);
  const unpublishDialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

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
      setFieldErrors((current) => {
        if (!current[key]) return current;
        const next = { ...current };
        delete next[key];
        return next;
      });
    },
    []
  );

  const syncSuccessfulSave = useCallback(
    (
      snapshot: StudioArticleInput,
      result: {
        articleId?: string;
        slug?: string;
        updatedAt?: string;
        articleStatus?: WikiArticleStatus;
      }
    ) => {
      const normalizedSnapshot =
        result.slug && !snapshot.slug
          ? { ...snapshot, slug: result.slug }
          : snapshot;

      if (result.slug && !formRef.current.slug) {
        setForm((current) => {
          const next = { ...current, slug: result.slug || current.slug };
          formRef.current = next;
          return next;
        });
      }

      lastSavedRef.current = JSON.stringify(normalizedSnapshot);

      if (result.articleId) {
        const wasNew = !articleIdRef.current;
        articleIdRef.current = result.articleId;
        setArticleId(result.articleId);

        if (wasNew) {
          router.replace(
            `/${locale}/studio/articles/${result.articleId}/edit`
          );
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
    },
    [locale, router]
  );

  const performSave = useCallback(
    async (manual: boolean) => {
      if (savingRef.current) return;

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

          if (manual) {
            const time = new Date(
              result.updatedAt || Date.now()
            ).toLocaleTimeString(locale === 'th' ? 'th-TH' : 'en-US', {
              hour: '2-digit',
              minute: '2-digit',
            });

            toast.success('บันทึกฉบับร่างแล้ว', {
              description: `แก้ไขล่าสุดเมื่อ ${time}`,
            });
          }
        } else {
          setSaveState('error');
          setFieldErrors(result.fieldErrors || {});

          if (manual) {
            toast.error('บันทึกไม่สำเร็จ', {
              description:
                'เนื้อหายังอยู่ในหน้าเขียน กรุณาลองอีกครั้ง',
              action: {
                label: 'ลองอีกครั้ง',
                onClick: () => void performSave(true),
              },
            });
          }
        }
      } catch (error) {
        setSaveState('error');

        if (manual) {
          toast.error('บันทึกไม่สำเร็จ', {
            description: 'เนื้อหายังอยู่ในหน้าเขียน กรุณาลองอีกครั้ง',
            action: {
              label: 'ลองอีกครั้ง',
              onClick: () => void performSave(true),
            },
          });
        } else {
          console.error(
            '[studio] Auto-save failed. User data may not be persisted.',
            error instanceof Error ? error.message : error
          );
        }
      } finally {
        savingRef.current = false;
        setIsSaving(false);
      }
    },
    [locale, syncSuccessfulSave]
  );

  useEffect(() => {
    const serialized = JSON.stringify(form);

    if (
      serialized === lastSavedRef.current ||
      !form.title.trim() ||
      !form.content.trim() ||
      isSaving ||
      isPublishing ||
      isUnpublishing ||
      isDeleting
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      void performSave(false);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [
    form,
    isDeleting,
    isPublishing,
    isSaving,
    isUnpublishing,
    performSave,
  ]);

  const formattedSaveStatus = useMemo(() => {
    if (saveState === 'saving') return 'กำลังบันทึก...';
    if (saveState === 'error') return 'บันทึกไม่สำเร็จ';
    if (saveState === 'unsaved' || !savedAt) return 'ยังไม่ได้บันทึก';

    const time = new Date(savedAt).toLocaleTimeString(
      locale === 'th' ? 'th-TH' : 'en-US',
      { hour: '2-digit', minute: '2-digit' }
    );
    return `บันทึกแล้ว · ${time}`;
  }, [locale, saveState, savedAt]);

  const currentMissing = getMissingFields(form);
  const highlightedMissing = new Set([
    ...currentMissing,
    ...publishMissing,
  ]);
  const anyActionPending =
    isSaving || isPublishing || isUnpublishing || isDeleting;

  async function handlePublish() {
    const missing = getMissingFields(formRef.current);

    if (missing.length > 0) {
      setPublishMissing(missing);
      setActiveTab('publish');
      toast.error('ยังเผยแพร่ไม่ได้', {
        description: `กรุณาเติม ${missing
          .map((field) => requirementLabels[field])
          .join(', ')} ก่อนเผยแพร่`,
      });
      return;
    }

    setIsPublishing(true);
    setPublishMissing([]);

    try {
      const snapshot = formRef.current;
      const result = await publishStudioArticle(
        articleIdRef.current,
        locale,
        snapshot
      );

      if (result.status === 'success') {
        syncSuccessfulSave(snapshot, result);
        setArticleStatus('published');
        toast.success('เผยแพร่บทความแล้ว', {
          description: 'บทความนี้เปิดให้อ่านบนเว็บไซต์แล้ว',
          action: result.slug
            ? {
                label: 'ดูบทความ',
                onClick: () =>
                  window.open(
                    `/${locale}/articles/${result.slug}`,
                    '_blank',
                    'noopener,noreferrer'
                  ),
              }
            : undefined,
        });
        router.refresh();
      } else if (result.missingFields?.length) {
        setPublishMissing(result.missingFields);
        toast.error('ยังเผยแพร่ไม่ได้', {
          description: `กรุณาเติม ${result.missingFields
            .map((field) => requirementLabels[field])
            .join(', ')} ก่อนเผยแพร่`,
        });
      } else {
        if (result.articleId) syncSuccessfulSave(snapshot, result);
        setFieldErrors(result.fieldErrors || {});
        toast.error('เผยแพร่ไม่สำเร็จ', {
          description:
            result.message === 'เผยแพร่ไม่สำเร็จ'
              ? 'ฉบับร่างยังถูกเก็บไว้ กรุณาตรวจสอบแล้วลองใหม่'
              : result.message,
          action: {
            label: 'ลองอีกครั้ง',
            onClick: () => void handlePublish(),
          },
        });
      }
    } catch {
      toast.error('เผยแพร่ไม่สำเร็จ', {
        description: 'ฉบับร่างยังถูกเก็บไว้ กรุณาตรวจสอบแล้วลองใหม่',
        action: {
          label: 'ลองอีกครั้ง',
          onClick: () => void handlePublish(),
        },
      });
    } finally {
      setIsPublishing(false);
    }
  }

  async function handleUnpublish() {
    if (!articleIdRef.current) return;

    setIsUnpublishing(true);

    try {
      const result = await unpublishStudioArticle(
        articleIdRef.current,
        locale
      );

      if (result.status === 'success') {
        setArticleStatus('draft');
        if (result.updatedAt) setSavedAt(result.updatedAt);
        unpublishDialogRef.current?.close();
        toast.success('ยกเลิกการเผยแพร่แล้ว', {
          description: 'บทความกลับเป็นฉบับร่าง',
        });
        router.refresh();
      } else {
        toast.error('ยกเลิกการเผยแพร่ไม่สำเร็จ', {
          description:
            result.message === 'ยกเลิกการเผยแพร่ไม่สำเร็จ'
              ? 'กรุณาลองอีกครั้ง'
              : result.message,
        });
      }
    } catch {
      toast.error('ยกเลิกการเผยแพร่ไม่สำเร็จ');
    } finally {
      setIsUnpublishing(false);
    }
  }

  async function handleDelete() {
    if (!articleIdRef.current) return;

    setIsDeleting(true);

    try {
      const result = await deleteStudioArticle(
        articleIdRef.current,
        locale
      );

      if (result.status === 'success') {
        deleteDialogRef.current?.close();
        toast.success('ลบบทความแล้ว', {
          description: 'บทความถูกลบออกจากระบบ',
        });
        router.push(`/${locale}/studio/articles`);
        router.refresh();
      } else {
        toast.error('ลบบทความไม่สำเร็จ', {
          description:
            result.message === 'ลบบทความไม่สำเร็จ'
              ? 'กรุณาลองอีกครั้ง'
              : result.message,
        });
      }
    } catch {
      toast.error('ลบบทความไม่สำเร็จ', {
        description: 'กรุณาลองอีกครั้ง',
      });
    } finally {
      setIsDeleting(false);
    }
  }

  function generateSeoMetadata() {
    const next = {
      ...formRef.current,
      seoTitle: formRef.current.seoTitle || formRef.current.title,
      seoDescription:
        formRef.current.seoDescription || formRef.current.excerpt,
    };
    formRef.current = next;
    setForm(next);
    setSaveState('unsaved');
  }

  function generateSlug() {
    updateField('slug', slugifyWikiValue(formRef.current.title));
  }

  function addReferenceLine() {
    const nextValue = formRef.current.references
      ? `${formRef.current.references.replace(/\s+$/, '')}\n`
      : '';
    updateField('references', nextValue);
    window.requestAnimationFrame(() => {
      referencesRef.current?.focus();
      const end = referencesRef.current?.value.length || 0;
      referencesRef.current?.setSelectionRange(end, end);
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <Link
            href={`/${locale}/studio/articles`}
            className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-accent"
          >
            ← กลับไปคลังบทความ
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="truncate text-xl font-medium text-text sm:text-2xl">
              {articleId ? form.title || 'บทความไม่มีชื่อ' : 'บทความใหม่'}
            </h1>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                articleStatus === 'published'
                  ? 'bg-celadon/12 text-celadon'
                  : articleStatus === 'archived'
                    ? 'bg-surface-soft text-muted'
                    : articleStatus === 'review'
                      ? 'bg-clay/12 text-clay'
                      : 'bg-accent-soft text-accent'
              }`}
            >
              {statusLabels[articleStatus]}
            </span>
          </div>
        </div>

        {articleStatus === 'published' && form.slug ? (
          <Link
            href={`/${locale}/articles/${form.slug}`}
            target="_blank"
            className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm text-text-soft transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            เปิดหน้าบทความ ↗
          </Link>
        ) : null}
      </header>

      <nav
        aria-label="ส่วนต่าง ๆ ของบทความ"
        className="mb-6 overflow-x-auto border-b border-border"
      >
        <div className="flex min-w-max gap-1" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`studio-panel-${tab.id}`}
              id={`studio-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-11 border-b-2 px-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <section
        id="studio-panel-write"
        role="tabpanel"
        aria-labelledby="studio-tab-write"
        hidden={activeTab !== 'write'}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 space-y-3">
            <label htmlFor="studio-title" className="sr-only">
              ชื่อบทความ
            </label>
            <input
              id="studio-title"
              autoFocus={!article}
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="ชื่อบทความ"
              maxLength={160}
              className="w-full border-0 bg-transparent px-0 py-2 font-serif text-3xl leading-tight text-text outline-none placeholder:text-faint sm:text-4xl"
              aria-invalid={Boolean(fieldErrors.title)}
            />
            {fieldErrors.title?.map((error) => (
              <p key={error} className="text-sm text-clay">
                {error}
              </p>
            ))}

            <label htmlFor="studio-subtitle" className="sr-only">
              ชื่อรองหรือคำถามกลาง
            </label>
            <input
              id="studio-subtitle"
              value={form.subtitle}
              onChange={(event) => updateField('subtitle', event.target.value)}
              placeholder="ชื่อรองหรือคำถามกลางของบทความ"
              maxLength={240}
              className="w-full border-0 bg-transparent px-0 py-2 text-lg text-text-soft outline-none placeholder:text-faint"
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
              <p className="text-xs text-muted sm:text-sm">
                พิมพ์ <code className="text-celadon">[[</code>{' '}
                เพื่อเชื่อมบทความหรือแนวคิด
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  role="status"
                  className={`text-xs tabular-nums sm:text-sm ${
                    saveState === 'error' ? 'text-clay' : 'text-muted'
                  }`}
                >
                  {formattedSaveStatus}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPreview((current) => !current)}
                  aria-pressed={showPreview}
                  className="inline-flex min-h-10 items-center rounded-md border border-border px-3 text-sm text-text-soft transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  {showPreview ? 'ปิดตัวอย่าง' : 'ดูตัวอย่าง'}
                </button>
              </div>
            </div>

            <div
              className={
                showPreview
                  ? 'grid lg:grid-cols-2'
                  : 'grid grid-cols-1'
              }
            >
              <div className={showPreview ? 'lg:border-r lg:border-border' : ''}>
                <label htmlFor="studio-content" className="sr-only">
                  เนื้อหาบทความ Markdown
                </label>
                <textarea
                  id="studio-content"
                  value={form.content}
                  onChange={(event) =>
                    updateField('content', event.target.value)
                  }
                  spellCheck
                  placeholder="เริ่มเขียนที่นี่..."
                  className="min-h-[34rem] w-full resize-y border-0 bg-background p-5 font-mono text-[0.95rem] leading-7 text-text outline-none placeholder:text-faint sm:p-6"
                  aria-invalid={Boolean(fieldErrors.content)}
                />
              </div>
              {showPreview ? (
                <div className="min-h-[34rem] border-t border-border p-5 lg:border-t-0 sm:p-6">
                  {form.content.trim() ? (
                    <div className="prose-reading">
                      <MarkdownContent content={form.content} locale={locale} />
                    </div>
                  ) : (
                    <p className="text-sm text-muted">
                      ตัวอย่างจะปรากฏเมื่อเริ่มเขียนเนื้อหา
                    </p>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-2xl text-sm text-muted">
              ฉบับร่างต้องมีเพียงชื่อและเนื้อหา
              รายละเอียดอื่นเติมภายหลังได้
            </p>
            <button
              type="button"
              onClick={() => void performSave(true)}
              disabled={anyActionPending}
              aria-busy={isSaving}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isSaving ? (
                <>
                  <Spinner />
                  กำลังบันทึก...
                </>
              ) : (
                'บันทึกฉบับร่าง'
              )}
            </button>
          </div>
        </div>
      </section>

      <section
        id="studio-panel-organize"
        role="tabpanel"
        aria-labelledby="studio-tab-organize"
        hidden={activeTab !== 'organize'}
        className="mx-auto max-w-5xl"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <label htmlFor="studio-category" className={labelClassName}>
                หมวดหมู่
              </label>
              <select
                id="studio-category"
                value={form.category}
                onChange={(event) =>
                  updateField('category', event.target.value)
                }
                className={inputClassName}
              >
                <option value="">ยังไม่เลือก</option>
                {Object.values(categories).map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name[locale]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="studio-school" className={labelClassName}>
                กรอบทฤษฎี
              </label>
              <select
                id="studio-school"
                value={form.school}
                onChange={(event) => updateField('school', event.target.value)}
                className={inputClassName}
              >
                <option value="">ยังไม่ระบุ</option>
                {articleSchools.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="studio-difficulty" className={labelClassName}>
                ระดับความยาก
              </label>
              <select
                id="studio-difficulty"
                value={form.difficulty}
                onChange={(event) =>
                  updateField('difficulty', event.target.value)
                }
                className={inputClassName}
              >
                <option value="">ยังไม่ระบุ</option>
                {articleDifficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="studio-tags" className={labelClassName}>
                Tags
              </label>
              <input
                id="studio-tags"
                value={form.tags}
                onChange={(event) => updateField('tags', event.target.value)}
                className={inputClassName}
                placeholder="shadow, jung, individuation"
              />
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
                placeholder="เงา, The Shadow"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="studio-related-concepts"
                className={labelClassName}
              >
                แนวคิดที่เกี่ยวข้อง
              </label>
              <textarea
                id="studio-related-concepts"
                rows={5}
                value={form.relatedConcepts}
                onChange={(event) =>
                  updateField('relatedConcepts', event.target.value)
                }
                className={`${textareaClassName} font-mono`}
                placeholder={'shadow | Shadow\nprojection | Projection'}
              />
              <p className="mt-2 text-xs text-muted">
                หนึ่งรายการต่อบรรทัด: slug | ชื่อที่แสดง
              </p>
            </div>

            <div>
              <label
                htmlFor="studio-related-articles"
                className={labelClassName}
              >
                Slug ของบทความที่เกี่ยวข้อง
              </label>
              <input
                id="studio-related-articles"
                value={form.relatedArticles}
                onChange={(event) =>
                  updateField('relatedArticles', event.target.value)
                }
                className={inputClassName}
                placeholder="article-one, article-two"
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
                placeholder="ไม่บังคับ"
              />
            </div>

            <div className="border-t border-border pt-5">
              <h2 className="text-base font-medium text-text">Backlinks</h2>
              {backlinks.length === 0 ? (
                <p className="mt-2 text-sm text-muted">
                  ยังไม่มี backlinks สำหรับบทความนี้
                </p>
              ) : (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {backlinks.map((backlink) => (
                    <li key={backlink.id}>
                      <Link
                        href={`/${locale}/studio/articles/${backlink.id}/edit`}
                        className="inline-flex min-h-10 items-center rounded-full bg-surface-raised px-4 text-sm text-text-soft transition-colors duration-200 hover:text-accent"
                      >
                        {backlink.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="studio-panel-references"
        role="tabpanel"
        aria-labelledby="studio-tab-references"
        hidden={activeTab !== 'references'}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium text-text">เอกสารอ้างอิง</h2>
            <p className="mt-2 text-sm text-muted">
              หนึ่งรายการต่อบรรทัดในรูปแบบ ผู้เขียน | ปี | ชื่อเรื่อง |
              สำนักพิมพ์หรือวารสาร | URL
            </p>
          </div>
          <button
            type="button"
            onClick={addReferenceLine}
            className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium text-text-soft transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            เพิ่มเอกสารอ้างอิง
          </button>
        </div>

        <textarea
          ref={referencesRef}
          id="studio-references"
          rows={16}
          value={form.references}
          onChange={(event) =>
            updateField('references', event.target.value)
          }
          className={`${textareaClassName} font-mono`}
          placeholder="Author | 2024 | Title | Publisher or Journal | https://..."
          aria-invalid={Boolean(fieldErrors.references)}
        />
        {fieldErrors.references?.map((error) => (
          <p key={error} className="mt-2 text-sm text-clay">
            {error}
          </p>
        ))}
      </section>

      <section
        id="studio-panel-seo"
        role="tabpanel"
        aria-labelledby="studio-tab-seo"
        hidden={activeTab !== 'seo'}
        className="mx-auto max-w-5xl"
      >
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium text-text">ข้อมูลสำหรับค้นหา</h2>
            <p className="mt-2 text-sm text-muted">
              ข้อมูลส่วนนี้ไม่ขัดจังหวะการเขียน และเติมให้ครบก่อนเผยแพร่ได้
            </p>
          </div>
          <button
            type="button"
            onClick={generateSeoMetadata}
            className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium text-text-soft transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            สร้างข้อมูล SEO
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="studio-slug" className="text-sm font-medium text-text">
                  Slug
                </label>
                <button
                  type="button"
                  onClick={generateSlug}
                  className="text-xs font-medium text-accent hover:text-accent-strong"
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
              />
              {fieldErrors.slug?.map((error) => (
                <p key={error} className="mt-2 text-sm text-clay">
                  {error}
                </p>
              ))}
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
                onChange={(event) =>
                  updateField('excerpt', event.target.value)
                }
                className={textareaClassName}
                placeholder="ประโยคสั้น ๆ ที่บอกว่าบทความกำลังสำรวจอะไร"
              />
            </div>

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
              <label
                htmlFor="studio-seo-description"
                className={labelClassName}
              >
                SEO description
              </label>
              <textarea
                id="studio-seo-description"
                rows={4}
                maxLength={320}
                value={form.seoDescription}
                onChange={(event) =>
                  updateField('seoDescription', event.target.value)
                }
                className={textareaClassName}
              />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="studio-cover-url" className={labelClassName}>
                URL ภาพปก
              </label>
              <input
                id="studio-cover-url"
                type="url"
                value={form.coverImageUrl}
                onChange={(event) =>
                  updateField('coverImageUrl', event.target.value)
                }
                className={inputClassName}
                placeholder="https://..."
              />
            </div>

            <div>
              <label htmlFor="studio-cover-alt" className={labelClassName}>
                Alt text ของภาพปก
              </label>
              <input
                id="studio-cover-alt"
                value={form.coverImageAlt}
                onChange={(event) =>
                  updateField('coverImageAlt', event.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="studio-cover-width" className={labelClassName}>
                  ความกว้าง
                </label>
                <input
                  id="studio-cover-width"
                  inputMode="numeric"
                  value={form.coverImageWidth}
                  onChange={(event) =>
                    updateField('coverImageWidth', event.target.value)
                  }
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="studio-cover-height" className={labelClassName}>
                  ความสูง
                </label>
                <input
                  id="studio-cover-height"
                  inputMode="numeric"
                  value={form.coverImageHeight}
                  onChange={(event) =>
                    updateField('coverImageHeight', event.target.value)
                  }
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="studio-translation-th" className={labelClassName}>
                  Thai translation slug
                </label>
                <input
                  id="studio-translation-th"
                  value={form.translationTh}
                  onChange={(event) =>
                    updateField('translationTh', event.target.value)
                  }
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="studio-translation-en" className={labelClassName}>
                  English translation slug
                </label>
                <input
                  id="studio-translation-en"
                  value={form.translationEn}
                  onChange={(event) =>
                    updateField('translationEn', event.target.value)
                  }
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="studio-panel-publish"
        role="tabpanel"
        aria-labelledby="studio-tab-publish"
        hidden={activeTab !== 'publish'}
        className="mx-auto max-w-4xl"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <h2 className="text-xl font-medium text-text">
              ตรวจความพร้อมก่อนเผยแพร่
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              บันทึกฉบับร่างได้ตลอดเวลา
              เงื่อนไขเหล่านี้ใช้เฉพาะตอนเผยแพร่เท่านั้น
            </p>

            <ul className="mt-6 divide-y divide-border border-y border-border">
              {(
                Object.keys(requirementLabels) as PublishRequirementKey[]
              ).map((field) => {
                const missing = highlightedMissing.has(field);
                return (
                  <li
                    key={field}
                    className="flex min-h-12 items-center justify-between gap-4 py-3"
                  >
                    <span className={missing ? 'text-clay' : 'text-text-soft'}>
                      {requirementLabels[field]}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        missing ? 'text-clay' : 'text-celadon'
                      }`}
                    >
                      {missing ? 'ยังไม่ครบ' : 'พร้อม'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="space-y-4 rounded-xl bg-surface p-5">
            <div>
              <p className="text-xs text-muted">สถานะปัจจุบัน</p>
              <p className="mt-1 font-medium text-text">
                {statusLabels[articleStatus]}
              </p>
            </div>

            <label className="flex min-h-11 items-center gap-3 rounded-lg border border-border px-3 text-sm text-text-soft">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField('featured', event.target.checked)
                }
                className="size-4 accent-[var(--accent)]"
              />
              บทความแนะนำ
            </label>

            <button
              type="button"
              onClick={() => void handlePublish()}
              disabled={anyActionPending}
              aria-busy={isPublishing}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isPublishing ? (
                <>
                  <Spinner />
                  กำลังเผยแพร่...
                </>
              ) : (
                'เผยแพร่'
              )}
            </button>

            {articleStatus === 'published' ? (
              <>
                <p className="text-xs leading-5 text-muted">
                  การบันทึกเก็บฉบับทำงานไว้
                  การเปลี่ยนแปลงขึ้นเว็บไซต์เมื่อกดเผยแพร่อีกครั้ง
                </p>
                <button
                  type="button"
                  onClick={() => unpublishDialogRef.current?.showModal()}
                  disabled={anyActionPending}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-text-soft transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-55"
                >
                  ยกเลิกการเผยแพร่
                </button>
              </>
            ) : null}
          </aside>
        </div>

        {articleId ? (
          <div className="mt-12 border-t border-clay/35 pt-8">
            <h2 className="text-xl font-medium text-clay">Danger Zone</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              การลบบทความควรใช้เมื่อไม่ต้องการเก็บบทความนี้ไว้ใน Studio แล้ว
              หากต้องการซ่อนจากหน้าเว็บ ให้ใช้การยกเลิกเผยแพร่แทน
            </p>
            <button
              type="button"
              onClick={() => deleteDialogRef.current?.showModal()}
              disabled={anyActionPending}
              className="mt-5 inline-flex min-h-11 items-center rounded-md bg-clay px-4 text-sm font-semibold text-background transition-colors duration-200 hover:bg-clay/85 disabled:cursor-not-allowed disabled:opacity-55"
            >
              ลบบทความ
            </button>
          </div>
        ) : null}
      </section>

      <dialog
        ref={unpublishDialogRef}
        className="w-[min(32rem,calc(100%-2rem))] rounded-xl border border-border bg-surface p-0 text-text backdrop:bg-black/70"
        onCancel={(event) => {
          if (isUnpublishing) event.preventDefault();
        }}
      >
        <div className="p-6">
          <h2 className="text-xl font-medium text-text">
            ยกเลิกการเผยแพร่บทความนี้หรือไม่?
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            บทความจะหายจากหน้าเว็บไซต์และกลับเป็นฉบับร่างใน Studio
          </p>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              autoFocus
              onClick={() => unpublishDialogRef.current?.close()}
              disabled={isUnpublishing}
              className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium text-text-soft hover:border-border-strong hover:text-text disabled:opacity-55"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={() => void handleUnpublish()}
              disabled={isUnpublishing}
              aria-busy={isUnpublishing}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold text-accent-ink hover:bg-accent-strong disabled:opacity-55"
            >
              {isUnpublishing ? (
                <>
                  <Spinner />
                  กำลังยกเลิก...
                </>
              ) : (
                'ยืนยันการยกเลิกเผยแพร่'
              )}
            </button>
          </div>
        </div>
      </dialog>

      <dialog
        ref={deleteDialogRef}
        className="w-[min(34rem,calc(100%-2rem))] rounded-xl border border-clay/45 bg-surface p-0 text-text backdrop:bg-black/70"
        onCancel={(event) => {
          if (isDeleting) event.preventDefault();
        }}
      >
        <div className="p-6">
          <h2 className="text-xl font-medium text-text">
            ลบบทความนี้หรือไม่?
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            บทความ ‘{form.title || 'บทความไม่มีชื่อ'}’ จะถูกลบออกจาก Studio
            การกระทำนี้ไม่ควรใช้แทนการยกเลิกเผยแพร่
          </p>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              autoFocus
              onClick={() => deleteDialogRef.current?.close()}
              disabled={isDeleting}
              className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium text-text-soft hover:border-border-strong hover:text-text disabled:opacity-55"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={isDeleting}
              aria-busy={isDeleting}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-clay px-4 text-sm font-semibold text-background hover:bg-clay/85 disabled:opacity-55"
            >
              {isDeleting ? (
                <>
                  <Spinner />
                  กำลังลบ...
                </>
              ) : (
                'ลบบทความ'
              )}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
