/**
 * Safely serialize a value for embedding inside a `<script>` tag.
 *
 * `JSON.stringify` alone does not escape HTML-significant sequences such as
 * `</script>` or `<!--`.  If user-controlled content (e.g. article titles,
 * author names) contains those sequences, an attacker can close the script
 * block and inject arbitrary HTML/JS.
 *
 * This helper replaces every `<` with its Unicode escape `\u003c` inside the
 * serialised string, which is semantically identical JSON but safe to embed
 * in `<script>` elements.
 */
export function safeJsonLdStringify(value: unknown): string {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}
