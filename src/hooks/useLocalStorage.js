import { useState, useEffect } from 'react';
import { 
  saveToLocalStorage, 
  getFromLocalStorage, 
  removeFromLocalStorage 
} from '../utils/storage';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = getFromLocalStorage(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      saveToLocalStorage(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      removeFromLocalStorage(key);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, removeValue];
};