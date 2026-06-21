'use client';

import { useActionState } from 'react';
import { createWikiArticle } from '@/app/[locale]/studio/actions';
import { categories } from '@/lib/content/categories';
import type { Locale } from '@/lib/site';
import { initialWikiActionState } from '@/lib/wiki/action-state';

interface CreateArticleFormProps {
  locale: Locale;
}

export function CreateArticleForm({ locale }: CreateArticleFormProps) {
  const action = createWikiArticle.bind(null, locale);
  const [state, formAction, pending] = useActionState(
    action,
    initialWikiActionState
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-text">
          ชื่อบทความ
        </label>
        <input
          id="title"
          name="title"
          required
          autoFocus
          maxLength={160}
          className="min-h-12 w-full rounded-lg border border-border bg-background px-4 text-text placeholder:text-faint focus:border-accent"
          placeholder="เช่น เงาในฐานะสิ่งที่เราไม่ยอมรับ"
        />
        {state.fieldErrors?.title?.map((error) => (
          <p key={error} className="mt-2 text-sm text-clay">{error}</p>
        ))}
      </div>

      <div>
        <label htmlFor="slug" className="mb-2 block text-sm font-medium text-text">
          Slug <span className="font-normal text-muted">(เว้นว่างเพื่อสร้างอัตโนมัติ)</span>
        </label>
        <input
          id="slug"
          name="slug"
          maxLength={180}
          className="min-h-12 w-full rounded-lg border border-border bg-background px-4 text-text placeholder:text-faint focus:border-accent"
          placeholder="shadow-and-disowned-self"
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
          defaultValue=""
          required
          className="min-h-12 w-full rounded-lg border border-border bg-background px-4 text-text focus:border-accent"
        >
          <option value="" disabled>
            {locale === 'th' ? 'เลือกหมวดหมู่' : 'Choose a category'}
          </option>
          {Object.values(categories).map((category) => (
            <option key={category.id} value={category.id}>
              {category.name[locale]}
            </option>
          ))}
        </select>
      </div>

      {state.status === 'error' ? (
        <p role="alert" className="rounded-lg bg-clay/12 px-4 py-3 text-sm text-clay">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-55"
        >
          {pending ? 'กำลังสร้าง…' : 'สร้างฉบับร่าง'}
        </button>
        <a
          href={`/${locale}/studio`}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium text-text-soft transition-colors duration-200 hover:border-border-strong hover:text-text"
        >
          ยกเลิก
        </a>
      </div>
    </form>
  );
}
