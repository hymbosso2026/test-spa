import { useCallback } from 'react';
import { getTranslation } from '../services/translationService';

export const useTranslation = (language: string) => {
  return useCallback((key: string) => getTranslation(language, key), [language]);
};
