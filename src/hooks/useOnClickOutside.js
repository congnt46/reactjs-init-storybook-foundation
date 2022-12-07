import { useEffect } from 'react';

const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

export default function useOnClickOutside(refs, handler, events = DEFAULT_EVENTS) {
  useEffect(
    () => {
      const listener = (event) => {
        const hasEvent = refs.findIndex((ref) => ref?.current?.contains(event.target));
        return hasEvent === -1 && handler(event);
      };

      events.forEach((event) => document.addEventListener(event, listener));

      return () => {
        events.forEach((event) => document.removeEventListener(event, listener));
      };
    },
    [refs, handler, events],
  );
}
