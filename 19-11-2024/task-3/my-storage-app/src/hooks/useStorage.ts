import { useCallback } from 'react';

function useStorage() {
  // Add or update an item in localStorage
  const addItem = useCallback((key: string, value: any) => {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Error adding item to localStorage with key "${key}":`, error);
    }
  }, []);

  // Get an item from localStorage
  const getItem = useCallback((key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error retrieving item from localStorage with key "${key}":`, error);
      return null;
    }
  }, []);

  // Remove an item from localStorage
  const removeItem = useCallback((key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage with key "${key}":`, error);
    }
  }, []);

  // Clear all items from localStorage
  const clearStorage = useCallback(() => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, []);

  return {
    addItem,
    getItem,
    removeItem,
    clearStorage,
  };
}

export default useStorage;
