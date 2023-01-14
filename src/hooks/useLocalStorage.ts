import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, val: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const JSONValue = localStorage.getItem(key);
    if (JSONValue != null) return JSON.parse(JSONValue);

    if (typeof val === 'function') return (val as () => T)();
    return val;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, val]);

  return [value, setValue] as [T, typeof setValue];
}
