'use client';

import { Toaster } from 'sonner';

export function StudioToaster() {
  return (
    <Toaster
      theme="dark"
      position="bottom-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            '!border-border !bg-surface-raised !text-text !shadow-[0_4px_8px_rgba(0,0,0,0.2)]',
          title: '!font-semibold !text-text',
          description: '!text-muted',
          actionButton:
            '!min-h-11 !rounded-md !bg-accent !px-3 !font-semibold !text-accent-ink',
          cancelButton:
            '!min-h-11 !rounded-md !bg-surface-soft !px-3 !text-text-soft',
          closeButton:
            '!border-border !bg-surface !text-text-soft hover:!text-text',
          error: '!border-clay/50',
          success: '!border-celadon/45',
        },
      }}
    />
  );
}
