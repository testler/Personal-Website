import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import paginateText from '../../utils/paginateText';
import useTypewriter from '../../hooks/useTypewriter';

/**
 * Reusable paginated text component.
 * Splits text into character-limited pages and displays one page at a time
 * with a typewriter effect. Users tap/click to skip typing or advance pages.
 *
 * @param {Object} props
 * @param {string[]} props.paragraphs - Text paragraphs to display
 * @param {number} [props.maxChars=280] - Max characters per page
 * @param {number} [props.charDelay=18] - Typewriter speed (ms per character)
 * @param {Function} [props.onFinish] - Called when all pages have been read
 * @param {Function} [props.onInteraction] - Called on first user tap/click
 * @param {string} [props.textClassName] - CSS class for text paragraphs
 * @param {string} [props.hintClassName] - CSS class for the hint label
 * @param {string} [props.typingClassName] - CSS class for the typing indicator
 * @param {React.ReactNode} [props.children] - Rendered after text is complete
 */
export default function PaginatedText({
  paragraphs,
  maxChars = 280,
  charDelay = 18,
  onFinish,
  onInteraction,
  textClassName = 'passage-text',
  hintClassName = 'passage-hint',
  typingClassName = 'passage-typing-indicator',
  children,
}) {
  const pages = useMemo(
    () => paginateText(paragraphs, maxChars),
    [paragraphs, maxChars],
  );

  const [pageIndex, setPageIndex] = useState(0);
  const interactedRef = useRef(false);
  const finishedRef = useRef(false);

  const currentText = pages[pageIndex] || '';

  const { displayedText, isTyping, isPreparing, skipToEnd } = useTypewriter(
    currentText,
    { charDelay, prepDelay: 300 },
  );

  const isLastPage = pageIndex >= pages.length - 1;
  const isComplete = isLastPage && !isPreparing && !isTyping;

  // Reset state when paragraphs change (new passage / new content)
  useEffect(() => {
    setPageIndex(0);
    finishedRef.current = false;
    interactedRef.current = false;
  }, [paragraphs]);

  // Fire onFinish once when complete
  useEffect(() => {
    if (isComplete && !finishedRef.current) {
      finishedRef.current = true;
      onFinish?.();
    }
  }, [isComplete, onFinish]);

  const handleClick = useCallback(() => {
    if (!interactedRef.current) {
      interactedRef.current = true;
      onInteraction?.();
    }

    if (isPreparing || isTyping) {
      skipToEnd();
      return;
    }

    if (!isLastPage) {
      setPageIndex((prev) => prev + 1);
    }
  }, [isPreparing, isTyping, skipToEnd, isLastPage, onInteraction]);

  const hintText =
    isPreparing || isTyping
      ? 'tap to skip'
      : !isLastPage
        ? `${pageIndex + 1} / ${pages.length} — tap to continue`
        : null;

  return (
    <div
      onClick={handleClick}
      className="paginated-text-wrap"
      style={{ cursor: isComplete ? 'default' : 'pointer' }}
    >
      <div className="passage-text-area">
        {isPreparing ? (
          <p className={`${textClassName} ${typingClassName}`}>...</p>
        ) : (
          <p className={textClassName}>{displayedText}</p>
        )}
      </div>

      {hintText && <span className={hintClassName}>{hintText}</span>}

      {isComplete && children}
    </div>
  );
}
