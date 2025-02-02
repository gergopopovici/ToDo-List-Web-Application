import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '../i18n';

interface LanguageContextType {
  language: string;
  changeLanguage: (lng: string) => void;
}

const languageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(languageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || i18n.language;
  });
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    localStorage.setItem('language', lng);
    i18n.changeLanguage(lng);
  };

  const value = React.useMemo(() => ({ language, changeLanguage }), [language]);

  return <languageContext.Provider value={value}>{children}</languageContext.Provider>;
}

export default LanguageProvider;
