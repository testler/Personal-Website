/**
 * Splits an array of paragraphs into pages that stay within a character limit.
 * When a paragraph exceeds maxChars, it breaks at sentence boundaries.
 *
 * @param {string[]} paragraphs - Array of text strings
 * @param {number} [maxChars=280] - Maximum characters per page
 * @returns {string[]} Array of page-sized text chunks
 */
export default function paginateText(paragraphs, maxChars = 280) {
  const pages = [];

  for (const para of paragraphs) {
    if (para.length <= maxChars) {
      pages.push(para);
      continue;
    }

    // Split into sentences at . ! ? followed by whitespace
    const sentences = para.split(/(?<=[.!?])\s+/);

    let current = '';
    for (const sentence of sentences) {
      if (current && current.length + 1 + sentence.length > maxChars) {
        pages.push(current.trim());
        current = sentence;
      } else {
        current += (current ? ' ' : '') + sentence;
      }
    }

    if (current.trim()) {
      pages.push(current.trim());
    }
  }

  return pages;
}
