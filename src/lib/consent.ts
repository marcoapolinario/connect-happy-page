// Consent Mode v2 + LGPD state manager.
// Persistes user choice in localStorage + first-party cookie (1y).
// Emits gtag('consent','update',...) so GTM/GA4/Ads respect the choice.

export type ConsentCategory = "necessary" | "analytics" | "marketing";
export type ConsentState = Record<ConsentCategory, boolean>;

const STORAGE_KEY = "tmr_consent_v2";
const COOKIE_NAME = "tmr_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const readCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
};

const writeCookie = (name: string, value: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
};

export const getStoredConsent = (): ConsentState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? readCookie(COOKIE_NAME);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CONSENT, ...parsed, necessary: true };
  } catch {
    return null;
  }
};

const toGtagConsent = (state: ConsentState) => ({
  ad_storage: state.marketing ? "granted" : "denied",
  ad_user_data: state.marketing ? "granted" : "denied",
  ad_personalization: state.marketing ? "granted" : "denied",
  analytics_storage: state.analytics ? "granted" : "denied",
  functionality_storage: "granted",
  security_storage: "granted",
});

export const applyConsent = (state: ConsentState) => {
  if (typeof window === "undefined") return;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  // Consent Mode v2 update — must go via dataLayer arguments form.
  w.dataLayer.push(["consent", "update", toGtagConsent(state)]);
  w.dataLayer.push({ event: "consent_update", consent: state });
};

export const saveConsent = (state: ConsentState) => {
  const normalized: ConsentState = { ...state, necessary: true };
  const raw = JSON.stringify(normalized);
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    /* private mode / disabled */
  }
  writeCookie(COOKIE_NAME, raw);
  applyConsent(normalized);
  return normalized;
};

export const acceptAll = () =>
  saveConsent({ necessary: true, analytics: true, marketing: true });

export const rejectAll = () =>
  saveConsent({ necessary: true, analytics: false, marketing: false });
