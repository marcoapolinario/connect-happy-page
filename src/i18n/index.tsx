import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import pt from "./pt.json";
import en from "./en.json";
import es from "./es.json";

export type Lang = "pt" | "en" | "es";

const dictionaries: Record<Lang, any> = { pt, en, es };

const LS_KEY = "turbomr.lang";

const detectLang = (): Lang => {
  if (typeof window === "undefined") return "pt";
  const saved = localStorage.getItem(LS_KEY) as Lang | null;
  if (saved && ["pt", "en", "es"].includes(saved)) return saved;
  const nav = (navigator.language || "pt").toLowerCase();
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("pt")) return "pt";
  return "en";
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => any;
}

const I18nContext = createContext<Ctx | null>(null);

const getByPath = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    // support array index like items[0]
    const m = key.match(/^([^\[]+)(?:\[(\d+)\])?$/);
    if (!m) return undefined;
    const k = m[1];
    const idx = m[2];
    let v = acc[k];
    if (idx !== undefined) v = v?.[Number(idx)];
    return v;
  }, obj);
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => detectLang());

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    localStorage.setItem(LS_KEY, l);
    setLangState(l);
  };

  const value = useMemo<Ctx>(() => {
    const dict = dictionaries[lang];
    return {
      lang,
      setLang,
      t: (path: string) => {
        const v = getByPath(dict, path);
        if (v === undefined) {
          // fallback to PT then key
          const fb = getByPath(dictionaries.pt, path);
          return fb !== undefined ? fb : path;
        }
        return v;
      },
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): Ctx => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
};
