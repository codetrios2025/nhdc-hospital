import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image = "https://namokarhospitaldeoli.com/assets/nhdc-logo-CJoxj7eN.png",
  noindex = false,
}) => {
  const siteName = "Namokar Hospital & Diagnostic Centre";
  const defaultUrl = "https://namokarhospitaldeoli.com";

  const pageTitle =
    title || "Namokar Hospital & Diagnostic Centre | Hospital in Deoli";

  const pageDescription =
    description ||
    "Namokar Hospital & Diagnostic Centre in Deoli provides pediatric healthcare, allergy diagnostics, advanced diagnostic tests, EEG, spirometry, sonography and laboratory services.";

  const canonicalUrl = canonical || defaultUrl;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{pageTitle}</title>

      <meta
        name="description"
        content={pageDescription}
      />

      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}

      <meta
        name="robots"
        content={noindex ? "noindex,nofollow" : "index,follow"}
      />

      <meta
        name="author"
        content="Namokar Hospital & Diagnostic Centre"
      />

      <meta
        name="publisher"
        content="Namokar Hospital & Diagnostic Centre"
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* Geo SEO */}
      <meta
        name="geo.region"
        content="IN-DL"
      />

      <meta
        name="geo.placename"
        content="Deoli, Delhi, India"
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={pageTitle}
      />

      <meta
        property="og:description"
        content={pageDescription}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:site_name"
        content={siteName}
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={pageTitle}
      />

      <meta
        name="twitter:description"
        content={pageDescription}
      />

      <meta
        name="twitter:image"
        content={image}
      />
    </Helmet>
  );
};

export default SEO;