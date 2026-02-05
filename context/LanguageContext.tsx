"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getTranslations } from "@/lib/translations";

export type Locale = "pt" | "en" | "es";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const STORAGE_KEY = "blackwolf-locale";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && ["pt", "en", "es"].includes(stored)) {
        setLocaleState(stored);
        const langMap: Record<Locale, string> = {
          pt: "pt-BR",
          en: "en",
          es: "es",
        };
        document.documentElement.lang = langMap[stored];
      }
    } catch {
      // ignore
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      const langMap: Record<Locale, string> = {
        pt: "pt-BR",
        en: "en",
        es: "es",
      };
      if (typeof document !== "undefined") {
        document.documentElement.lang = langMap[newLocale];
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (ctx === undefined) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

export const LOCALE_LABELS: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export function useTranslations() {
  const { locale } = useLanguage();
  return getTranslations(locale);
}
