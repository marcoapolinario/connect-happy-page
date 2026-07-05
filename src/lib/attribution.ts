// First-touch attribution: captures UTMs/GCLID/FBCLID on landing,
// persists in first-party cookie (90d) + sessionStorage, and injects
// into every form submission and outbound WhatsApp click.

const STORAGE_KEY = "tmr_attribution";
const COOKIE_NAME = "tmr_attr";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
  captured_at?: string;
}

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
};

const writeCookie = (name: string, value: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
};

const readStored = (): Attribution | null => {
  try {
    const raw =
      sessionStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(STORAGE_KEY) ??
      readCookie(COOKIE_NAME);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
};

const persist = (data: Attribution) => {
  const raw = JSON.stringify(data);
  try {
    sessionStorage.setItem(STORAGE_KEY, raw);
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    /* ignore */
  }
  writeCookie(COOKIE_NAME, raw);
};

const parseParams = (search: string): Partial<Attribution> => {
  const p = new URLSearchParams(search);
  const pick = (k: string) => p.get(k)?.slice(0, 200) || undefined;
  return {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_content: pick("utm_content"),
    utm_term: pick("utm_term"),
    gclid: pick("gclid"),
    fbclid: pick("fbclid"),
  };
};

/** Call once on app boot. Captures params from URL, keeps first-touch. */
export const initAttribution = () => {
  if (typeof window === "undefined") return;
  const current = parseParams(window.location.search);
  const hasAny = Object.values(current).some(Boolean);
  const stored = readStored();

  if (!stored) {
    persist({
      ...current,
      referrer: document.referrer?.slice(0, 500) || undefined,
      landing_page: window.location.href.slice(0, 500),
      captured_at: new Date().toISOString(),
    });
  } else if (hasAny) {
    // Overwrite only when a new campaign hit comes in.
    persist({
      ...stored,
      ...current,
      landing_page: window.location.href.slice(0, 500),
      captured_at: new Date().toISOString(),
    });
  }
};

export const getAttribution = (): Attribution => readStored() ?? {};

const detectDevice = (): string => {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
};

const detectBrowser = (): string => {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "edge";
  if (/Chrome\//.test(ua)) return "chrome";
  if (/Firefox\//.test(ua)) return "firefox";
  if (/Safari\//.test(ua)) return "safari";
  return "other";
};

/** Extra fields worth sending with a lead alongside the attribution. */
export const getLeadContext = () => ({
  page_url: typeof window !== "undefined" ? window.location.href.slice(0, 500) : undefined,
  referrer: typeof document !== "undefined" ? document.referrer?.slice(0, 500) || undefined : undefined,
  device: detectDevice(),
  browser: detectBrowser(),
  user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : undefined,
});

/** Append UTMs as query params to an outbound URL. */
export const withAttributionParams = (url: string): string => {
  const attr = getAttribution();
  const params = new URLSearchParams();
  (["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const).forEach((k) => {
    if (attr[k]) params.set(k, attr[k] as string);
  });
  const qs = params.toString();
  if (!qs) return url;
  return url + (url.includes("?") ? "&" : "?") + qs;
};
