import { useCallback, useEffect, useRef, useState } from 'react';

export default function useTypewriter(text, { charDelay = 23, prepDelay = 400 } = {}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);

  const prepRef = useRef(null);
  const intervalRef = useRef(null);

  const cleanup = useCallback(() => {
    if (prepRef.current) window.clearTimeout(prepRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    prepRef.current = null;
    intervalRef.current = null;
  }, []);

  const skipToEnd = useCallback(() => {
    cleanup();
    if (text) setDisplayedText(text);
    setIsPreparing(false);
    setIsTyping(false);
  }, [text, cleanup]);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      setIsPreparing(false);
      setIsTyping(false);
      return undefined;
    }

    setDisplayedText('');
    setIsTyping(false);
    setIsPreparing(true);
    cleanup();

    prepRef.current = window.setTimeout(() => {
      setIsPreparing(false);
      setIsTyping(true);
      let i = 0;
      intervalRef.current = window.setInterval(() => {
        i += 1;
        setDisplayedText(text.slice(0, i));
        if (i >= text.length) {
          setIsTyping(false);
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, charDelay);
    }, prepDelay);

    return cleanup;
  }, [text, charDelay, prepDelay, cleanup]);

  return { displayedText, isTyping, isPreparing, skipToEnd };
}
