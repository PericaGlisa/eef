import { sr } from "@/locales/sr";
import { en } from "@/locales/en";
import { useLang, type Lang } from "@/contexts/LanguageContext";

const translations = { sr, en };

function getNestedValue(obj: Record<string, unknown>, key: string): string | string[] | undefined {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  if (typeof current === "string") return current;
  if (Array.isArray(current)) return current as string[];
  return undefined;
}

export function t(key: string, lang: Lang): string {
  const value = getNestedValue(translations[lang], key);
  if (typeof value === "string") return value;
  // Fallback to Serbian if key missing
  const srValue = getNestedValue(translations.sr, key);
  if (typeof srValue === "string") return srValue;
  console.warn(`[i18n] Missing translation key: "${key}" for lang: ${lang}`);
  return key;
}

export function tArray(key: string, lang: Lang): string[] {
  const value = getNestedValue(translations[lang], key);
  if (Array.isArray(value)) return value;
  // Fallback to Serbian if key missing
  const srValue = getNestedValue(translations.sr, key);
  if (Array.isArray(srValue)) return srValue;
  console.warn(`[i18n] Missing array translation key: "${key}" for lang: ${lang}`);
  return [];
}

export function useTranslation() {
  const { lang } = useLang();
  return {
    t: (key: string) => t(key, lang),
    tArray: (key: string) => tArray(key, lang),
    lang,
  };
}
