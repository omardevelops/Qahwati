import { useState, useCallback } from 'react';

/**
 * A custom hook for managing a list of entities in localStorage with full CRUD support.
 * @param {string} key - The localStorage key to use.
 * @returns {{ items, add, update, remove }}
 */
function useLocalStorage(key) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const persist = useCallback(
    (newItems) => {
      setItems(newItems);
      localStorage.setItem(key, JSON.stringify(newItems));
    },
    [key]
  );

  const add = useCallback(
    (data) => {
      const newItem = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
      persist([...items, newItem]);
      return newItem;
    },
    [items, persist]
  );

  const update = useCallback(
    (id, data) => {
      persist(items.map((item) => (item.id === id ? { ...item, ...data, id } : item)));
    },
    [items, persist]
  );

  const remove = useCallback(
    (id) => {
      persist(items.filter((item) => item.id !== id));
    },
    [items, persist]
  );

  return { items, add, update, remove };
}

export default useLocalStorage;
