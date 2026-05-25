import { KeyboardEvent } from 'react';

const SELECTION_KEYS = ['Enter', ' '] as const;

export function handleKeyboardSelect(
  event: KeyboardEvent,
  callback: () => void,
) {
  const isSelectionKey = SELECTION_KEYS.includes(
    event.key as (typeof SELECTION_KEYS)[number],
  );

  if (!isSelectionKey) {
    return;
  }

  event.preventDefault();

  callback();
}
