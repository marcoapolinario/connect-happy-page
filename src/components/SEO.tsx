import { Helmet } from "react-helmet-async";
import { usePageSeo } from "@/hooks/usePageSeo";

export const SITE_URL = "https://connect-happy-page.lovable.app";
const DEFAULT_OG =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9179e4bd-be54-473e-b6be-7d9882dd9375/id-preview-0a896965--b4f4aaf9-49ca-4d39-a3ed-ec34c6d6326e.lovable.app-1776461967238.png";

interface SEOProps {
  title: string;
  description: string;
  path: string; // e.g. "/", "/blog", "/blog/slug"
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noindex?: boolean;
  jsonLd?: object | object[];
  locale?: "pt_BR" | "en_US" | "es_ES";
}

/**
 * Reusable per-route head. Handles title, description, canonical, OG, Twitter, JSON-LD.
 * Live overrides from the page_seo table (admin editable) take precedence over props.
 */
export const SEO = ({
  title,
  description,
  path,
  image = DEFAULT_OG,
  type = "website",
  keywords,
  noindex,
  jsonLd,
  locale = "pt_BR",
}: SEOProps) => {
  const override = usePageSeo(path);

  const finalTitle = override?.title || title;
  const finalDesc = override?.description || description;
  const finalKeywords = override?.keywords?.length ? override.keywords : keywords;
  const finalImage = override?.og_image || image;
  const finalNoindex = override?.noindex ?? noindex;

  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const ldArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  if (override?.schema_json) ldArray.push(override.schema_json as object);

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      {finalKeywords && finalKeywords.length > 0 && (
        <meta name="keywords" content={finalKeywords.join(", ")} />
      )}
      <link rel="canonical" href={url} />
      {finalNoindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />

      {ldArray.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
};
