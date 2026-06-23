import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SoulIcon } from './SoulIcon';

describe('SoulIcon', () => {
  it('hides decorative icons and labels meaningful icons', () => {
    expect(
      renderToStaticMarkup(createElement(SoulIcon, { name: 'compass' }))
    ).toContain('aria-hidden="true"');

    const meaningful = renderToStaticMarkup(
      createElement(SoulIcon, {
        name: 'warning',
        decorative: false,
        title: 'Caution',
      })
    );

    expect(meaningful).toContain('role="img"');
    expect(meaningful).toContain('aria-label="Caution"');
    expect(meaningful).toContain('<title>Caution</title>');
  });
});
