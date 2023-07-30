import { useState, useEffect } from 'react';

function useLocalStorageState(key, defaultValue, maxAge = 30 * 60 * 1000) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const { value, timestamp } = JSON.parse(storedValue);
      const isExpired = new Date().getTime() - timestamp > maxAge;
      if (!isExpired) {
        return value;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    const timestamp = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({ value: state, timestamp }));
  }, [state, key]);

  return [state, setState];
}

export default useLocalStorageState