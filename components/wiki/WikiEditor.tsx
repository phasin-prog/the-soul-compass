'use client';

import { useActionState, useState } from 'react';
import { updateWikiArticle } from '@/app/[locale]/studio/actions';
import { categories } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import { initialWikiActionState } from '@/lib/wiki/action-state';
import {
  formatConceptLinks,
  formatReferences,
} from '@/lib/wiki/article-metadata';
import type { WikiArticle } from '@/lib/wiki/types';
import { articleDifficulties, articleSchools } from '@/types/article';
import { MarkdownContent } from './MarkdownContent';

interface WikiEditorProps {
  article: WikiArticle;
  locale: Locale;
}

export function WikiEditor({ article, locale }: WikiEditorProps) {
  const action = updateWikiArticle.bind(null, article.id, locale);
  const [state, formAction, pending] = useActionState(
    action,
    initialWikiActionState
  );
  const [content, setContent] = useState(article.content);
  const [mobilePanel, setMobilePanel] = useState<'write' | 'preview'>('write');

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-text">
              ชื่อบทความ
            </label>
            <input
              id="title"
              name="title"
              required
              maxLength={160}
              defaultValue={article.title}
              className="min-h-12 w-full rounded-lg border border-border bg-background px-4 text-lg font-medium text-text focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="mb-2 block text-sm font-medium text-text">
              ชื่อรอง
            </label>
            <input
              id="subtitle"
              name="subtitle"
              maxLength={240}
              defaultValue={article.subtitle}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-4 text-text focus:border-accent"
              placeholder="ประโยคที่ขยายคำถามหรือกรอบของบทความ"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="slug" className="mb-2 block text-sm font-medium text-text">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                required
                maxLength={180}
                defaultValue={article.slug}
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              />
              {state.fieldErrors?.slug?.map((error) => (
                <p key={error} className="mt-2 text-sm text-clay">{error}</p>
              ))}
            </div>
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium text-text">
                หมวดหมู่
              </label>
              <select
                id="category"
                name="category"
                defaultValue={article.category}
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              >
                {Object.values(categories).map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name[locale]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-text">
              คำโปรย
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              maxLength={500}
              defaultValue={article.excerpt}
              className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-text focus:border-accent"
              placeholder="ประโยคสั้น ๆ ที่ช่วยให้ผู้อ่านรู้ว่าบทความนี้กำลังสำรวจอะไร"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="school" className="mb-2 block text-sm font-medium text-text">
                สำนัก / กรอบทฤษฎี
              </label>
              <select
                id="school"
                name="school"
                defaultValue={article.school}
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              >
                {articleSchools.map((school) => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="mb-2 block text-sm font-medium text-text">
                ระดับความยาก
              </label>
              <select
                id="difficulty"
                name="difficulty"
                defaultValue={article.difficulty}
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              >
                {articleDifficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <aside className="space-y-5 rounded-xl bg-surface-raised p-5">
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium text-text">
              สถานะ
            </label>
            <select
              id="status"
              name="status"
              defaultValue={article.status}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
            >
              <option value="draft">ฉบับร่าง — เฉพาะคุณ</option>
              <option value="review">ตรวจทาน — ยังไม่แสดงบนเว็บไซต์</option>
              <option value="published">เผยแพร่ — แสดงบนเว็บไซต์</option>
            </select>
          </div>

          <label className="flex min-h-11 items-center gap-3 rounded-lg border border-border px-3 text-sm text-text-soft">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={article.featured}
              className="size-4 accent-[var(--accent)]"
            />
            แสดงเป็นบทความแนะนำ
          </label>

          <div>
            <label htmlFor="tags" className="mb-2 block text-sm font-medium text-text">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              defaultValue={article.tags.join(', ')}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              placeholder="shadow, jung, individuation"
            />
          </div>

          <div>
            <label htmlFor="aliases" className="mb-2 block text-sm font-medium text-text">
              Aliases
            </label>
            <input
              id="aliases"
              name="aliases"
              defaultValue={article.aliases.join(', ')}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              placeholder="เงา, The Shadow"
            />
          </div>

          <div className="text-sm leading-relaxed text-muted">
            <p>เชื่อมเนื้อหาแบบ Obsidian:</p>
            <code className="mt-2 block rounded-md bg-background px-3 py-2 text-celadon">
              {'[[slug|ข้อความที่แสดง]]'}
            </code>
            <code className="mt-2 block rounded-md bg-background px-3 py-2 text-celadon">
              {'[[concept:slug|ชื่อแนวคิด]]'}
            </code>
          </div>
        </aside>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-5 rounded-xl border border-border bg-surface p-5">
          <div>
            <h2 className="text-lg font-semibold text-text">การเชื่อมโยง</h2>
            <p className="mt-1 text-sm text-muted">
              ข้อมูลชุดนี้ใช้สร้าง related concepts, related articles และลิงก์ข้ามภาษา
            </p>
          </div>

          <div>
            <label htmlFor="relatedConcepts" className="mb-2 block text-sm font-medium text-text">
              Related concepts
            </label>
            <textarea
              id="relatedConcepts"
              name="relatedConcepts"
              rows={5}
              defaultValue={formatConceptLinks(article.relatedConcepts)}
              className="w-full resize-y rounded-lg border border-border bg-background px-3 py-3 font-mono text-sm leading-6 text-text focus:border-accent"
              placeholder={'shadow | Shadow\nprojection | Projection'}
            />
            <p className="mt-2 text-xs text-muted">หนึ่งรายการต่อบรรทัด: slug | ชื่อที่แสดง</p>
          </div>

          <div>
            <label htmlFor="relatedArticles" className="mb-2 block text-sm font-medium text-text">
              Related article slugs
            </label>
            <input
              id="relatedArticles"
              name="relatedArticles"
              defaultValue={article.relatedArticles.join(', ')}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              placeholder="article-one, article-two"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="translationTh" className="mb-2 block text-sm font-medium text-text">
                Thai translation slug
              </label>
              <input
                id="translationTh"
                name="translationTh"
                defaultValue={article.translations.th || ''}
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="translationEn" className="mb-2 block text-sm font-medium text-text">
                English translation slug
              </label>
              <input
                id="translationEn"
                name="translationEn"
                defaultValue={article.translations.en || ''}
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              />
            </div>
          </div>
        </section>

        <section className="space-y-5 rounded-xl border border-border bg-surface p-5">
          <div>
            <h2 className="text-lg font-semibold text-text">เอกสารอ้างอิง</h2>
            <p className="mt-1 text-sm text-muted">
              หนึ่งรายการต่อบรรทัด โดยคั่นแต่ละช่องด้วย |
            </p>
          </div>
          <textarea
            id="references"
            name="references"
            rows={12}
            defaultValue={formatReferences(article.references)}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-3 font-mono text-sm leading-6 text-text focus:border-accent"
            placeholder="ผู้เขียน | 2024 | ชื่อเรื่อง | สำนักพิมพ์หรือวารสาร | https://..."
          />
          {state.fieldErrors?.references?.map((error) => (
            <p key={error} className="text-sm text-clay">{error}</p>
          ))}
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-5 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold text-text">SEO</h2>
          <div>
            <label htmlFor="seoTitle" className="mb-2 block text-sm font-medium text-text">
              SEO title
            </label>
            <input
              id="seoTitle"
              name="seoTitle"
              maxLength={160}
              defaultValue={article.seoTitle}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="seoDescription" className="mb-2 block text-sm font-medium text-text">
              SEO description
            </label>
            <textarea
              id="seoDescription"
              name="seoDescription"
              rows={4}
              maxLength={320}
              defaultValue={article.seoDescription}
              className="w-full resize-y rounded-lg border border-border bg-background px-3 py-3 text-sm leading-6 text-text focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="seriesId" className="mb-2 block text-sm font-medium text-text">
              Series ID
            </label>
            <input
              id="seriesId"
              name="seriesId"
              defaultValue={article.seriesId || ''}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              placeholder="optional-series-id"
            />
          </div>
        </section>

        <section className="space-y-5 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold text-text">ภาพปก</h2>
          <div>
            <label htmlFor="coverImageUrl" className="mb-2 block text-sm font-medium text-text">
              Image URL
            </label>
            <input
              id="coverImageUrl"
              name="coverImageUrl"
              type="url"
              defaultValue={article.coverImage?.src || ''}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              placeholder="https://..."
            />
          </div>
          <div>
            <label htmlFor="coverImageAlt" className="mb-2 block text-sm font-medium text-text">
              Alt text
            </label>
            <input
              id="coverImageAlt"
              name="coverImageAlt"
              defaultValue={article.coverImage?.alt || ''}
              className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="coverImageWidth" className="mb-2 block text-sm font-medium text-text">
                Width
              </label>
              <input
                id="coverImageWidth"
                name="coverImageWidth"
                type="number"
                min={1}
                defaultValue={article.coverImage?.width || 1600}
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="coverImageHeight" className="mb-2 block text-sm font-medium text-text">
                Height
              </label>
              <input
                id="coverImageHeight"
                name="coverImageHeight"
                type="number"
                min={1}
                defaultValue={article.coverImage?.height || 900}
                className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-text focus:border-accent"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex border-b border-border bg-surface">
          <button
            type="button"
            onClick={() => setMobilePanel('write')}
            className={`min-h-11 flex-1 px-4 text-sm font-medium lg:pointer-events-none lg:flex-none ${
              mobilePanel === 'write' ? 'bg-surface-raised text-accent' : 'text-muted'
            }`}
          >
            Markdown
          </button>
          <button
            type="button"
            onClick={() => setMobilePanel('preview')}
            className={`min-h-11 flex-1 px-4 text-sm font-medium lg:pointer-events-none lg:flex-none ${
              mobilePanel === 'preview' ? 'bg-surface-raised text-accent' : 'text-muted'
            }`}
          >
            Preview
          </button>
        </div>

        <div className="grid min-h-[32rem] lg:grid-cols-2">
          <div className={`${mobilePanel === 'write' ? 'block' : 'hidden'} lg:block`}>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              spellCheck
              className="h-full min-h-[32rem] w-full resize-y border-0 bg-background p-5 font-mono text-[0.95rem] leading-7 text-text outline-none lg:border-r lg:border-border"
              aria-label="เนื้อหาบทความ Markdown"
            />
          </div>
          <div
            className={`${mobilePanel === 'preview' ? 'block' : 'hidden'} overflow-y-auto p-6 lg:block`}
          >
            <div className="prose-reading">
              <MarkdownContent content={content} locale={locale} />
            </div>
          </div>
        </div>
      </div>

      {state.message ? (
        <p
          role="status"
          className={`rounded-lg px-4 py-3 text-sm ${
            state.status === 'success'
              ? 'bg-celadon/12 text-celadon'
              : 'bg-clay/12 text-clay'
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-raised p-3 shadow-[0_6px_8px_rgba(0,0,0,0.2)]">
        <p className="px-2 text-sm text-muted">
          {article.outgoingLinks.length} wiki links · แก้ไขล่าสุด{' '}
          {new Date(article.updatedAt).toLocaleString(locale === 'th' ? 'th-TH' : 'en-US')}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-55"
        >
          {pending ? 'กำลังบันทึก…' : 'บันทึก'}
        </button>
      </div>
    </form>
  );
}
