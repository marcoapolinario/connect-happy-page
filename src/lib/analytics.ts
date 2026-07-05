// Thin, typed wrapper around window.dataLayer for GTM.
// GA4, Ads, Meta Pixel, LinkedIn Insight are all fired from GTM using these events.

export type AnalyticsEvent =
  | "page_view"
  | "scroll_depth"
  | "cta_click"
  | "whatsapp_click"
  | "email_click"
  | "phone_click"
  | "form_start"
  | "form_submit"
  | "lead_conversion"
  | "demo_request"
  | "poc_request"
  | "video_play"
  | "video_complete"
  | "download"
  | "section_view"
  | "outbound_click"
  | "time_on_page";

type Params = Record<string, unknown>;

const push = (payload: Params) => {
  if (typeof window === "undefined") return;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
};

export const track = (event: AnalyticsEvent, params: Params = {}) => {
  push({ event, ...params });
};

export const pageview = (path: string, title?: string) => {
  push({
    event: "page_view",
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : path,
    page_title: title ?? (typeof document !== "undefined" ? document.title : undefined),
  });
};

export const identify = (traits: Params) => {
  push({ event: "identify", ...traits });
};
